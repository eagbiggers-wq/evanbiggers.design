(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeLightbox = null;

  const fitGalleryCellImages = root => {
    root.querySelectorAll(".gallery-item .image-slot > img").forEach(image => {
      image.draggable = false;
      const updateRatio = () => {
        if (!image.naturalWidth || !image.naturalHeight) return;
        const slot = image.closest(".image-slot");
        if (slot) slot.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
      };
      if (image.complete) updateRatio();
      else image.addEventListener("load", updateRatio, { once: true });
    });
  };
  window.fitGalleryCellImages = fitGalleryCellImages;
  fitGalleryCellImages(document);

  window.openGalleryImageLightbox = item => {
    if (!(item instanceof Element) || !item.matches(".gallery-item") || activeLightbox) return;

    const sourceFrame = item.querySelector(".image-slot");
    if (!sourceFrame) return;
    const sourceBounds = sourceFrame.getBoundingClientRect();
    const sourceImage = sourceFrame.querySelector("img");
    const videoSource = item.dataset.galleryVideo;
    const pages = (videoSource ? "" : item.dataset.galleryPages || sourceImage?.src || "")
      .split("|")
      .filter(Boolean);
    const ratio = sourceImage?.naturalWidth && sourceImage.naturalHeight
      ? sourceImage.naturalWidth / sourceImage.naturalHeight
      : sourceBounds.width / sourceBounds.height;
    const width = Math.min(window.innerWidth * 0.88, window.innerHeight * 0.82 * ratio, 1100);
    const height = width / ratio;
    const lightbox = document.createElement("div");
    const content = document.createElement("div");
    const caption = document.createElement("div");
    const title = item.querySelector(".gallery-overlay strong");
    const subtitle = item.querySelector(".gallery-overlay small");
    const imageLabel = videoSource
      ? title?.textContent || sourceFrame.getAttribute("aria-label") || "Expanded video"
      : sourceFrame.getAttribute("aria-label") || "Expanded image";
    const isFlipbook = pages.length > 1;
    let visual;
    let video;
    let videoError;
    let currentImage;
    let nextCue;

    lightbox.className = "gallery-image-lightbox";
    content.className = "gallery-image-lightbox-content";
    caption.className = "gallery-image-lightbox-caption";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", imageLabel);
    lightbox.tabIndex = -1;

    if (title) {
      const captionTitle = document.createElement("strong");
      captionTitle.textContent = title.textContent;
      caption.append(captionTitle);
    }
    if (subtitle) {
      const captionSubtitle = document.createElement("small");
      captionSubtitle.textContent = subtitle.textContent;
      caption.append(captionSubtitle);
    }

    let pageIndex = 0;
    const pageCounter = document.createElement("small");
    pageCounter.className = "gallery-image-lightbox-counter";
    if (videoSource) {
      video = document.createElement("video");
      video.className = "gallery-image-lightbox-video";
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.poster = sourceImage?.getAttribute("src") || "";
      video.src = videoSource;
      video.setAttribute("aria-label", title?.textContent || imageLabel);
      videoError = document.createElement("span");
      videoError.className = "gallery-image-lightbox-video-error";
      videoError.setAttribute("role", "status");
      videoError.hidden = true;
      video.addEventListener("error", () => {
        videoError.textContent = "Unable to load this video.";
        videoError.hidden = false;
        console.error(new Error(`Unable to load gallery video: ${videoSource}`));
      });
      visual = video;
    } else if (pages.length) {
      pageCounter.textContent = `01 / ${String(pages.length).padStart(2, "0")}`;
      caption.append(pageCounter);
      visual = document.createElement("div");
      visual.className = "gallery-image-lightbox-stage";
      currentImage = document.createElement("img");
      currentImage.className = "gallery-image-lightbox-image";
      currentImage.src = pages[0];
      currentImage.alt = imageLabel;
      currentImage.draggable = false;
      visual.append(currentImage);
      if (isFlipbook) {
        nextCue = document.createElement("span");
        nextCue.className = "gallery-image-lightbox-next-cue";
        nextCue.setAttribute("aria-hidden", "true");
        visual.append(nextCue);
      }
    } else {
      visual = sourceFrame.cloneNode(true);
      visual.classList.add("gallery-image-lightbox-image");
      visual.setAttribute("aria-hidden", "true");
    }
    Object.assign(visual.style, {
      width: `${width}px`,
      height: `${height}px`,
      maxWidth: "88vw",
      maxHeight: "82vh",
      aspectRatio: String(ratio)
    });
    if (video) content.append(visual, caption, videoError);
    else content.append(visual, caption);
    lightbox.append(content);
    document.body.append(lightbox);

    const previousOverflow = document.body.style.overflow;
    const previousRootOverflowY = document.documentElement.style.overflowY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousFocus = item;
    let isClosing = false;
    let isSwiping = false;
    let swipeAnimations = [];
    let cueDelay = 0;
    let cueInterval = 0;
    let cueEnd = 0;

    if (scrollbarWidth > 0) {
      document.documentElement.style.overflowY = "scroll";
    }
    document.body.style.overflow = "hidden";
    activeLightbox = lightbox;

    const showNextCue = () => {
      if (activeLightbox !== lightbox || isClosing || !isFlipbook) return;
      visual.classList.remove("is-cueing");
      void visual.offsetWidth;
      visual.classList.add("is-cueing");
      window.clearTimeout(cueEnd);
      cueEnd = window.setTimeout(() => visual.classList.remove("is-cueing"), 700);
    };
    const scheduleNextCue = () => {
      window.clearTimeout(cueDelay);
      window.clearInterval(cueInterval);
      window.clearTimeout(cueEnd);
      visual.classList.remove("is-cueing");
      if (!isFlipbook || isClosing) return;
      cueDelay = window.setTimeout(() => {
        showNextCue();
        cueInterval = window.setInterval(showNextCue, 3000);
      }, 1000);
    };

    const loadPageImage = source => new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image), { once: true });
      image.addEventListener("error", () => reject(new Error(`Could not load gallery image: ${source}`)), { once: true });
      image.src = source;
      if (image.complete) {
        if (image.naturalWidth > 0) resolve(image);
        else reject(new Error(`Could not load gallery image: ${source}`));
      }
    });

    const changePage = async step => {
      if (!isFlipbook || isClosing || isSwiping) return;
      const nextIndex = (pageIndex + step + pages.length) % pages.length;
      isSwiping = true;
      window.clearTimeout(cueDelay);
      window.clearInterval(cueInterval);
      window.clearTimeout(cueEnd);
      visual.classList.remove("is-cueing");

      let incomingImage;
      try {
        incomingImage = await loadPageImage(pages[nextIndex]);
      } catch (error) {
        console.error(error);
        isSwiping = false;
        scheduleNextCue();
        return;
      }
      if (activeLightbox !== lightbox || isClosing) {
        isSwiping = false;
        return;
      }

      incomingImage.className = "gallery-image-lightbox-swipe";
      incomingImage.alt = "";
      visual.append(incomingImage);
      const outgoingOffset = step > 0 ? -100 : 100;
      const incomingOffset = -outgoingOffset;
      const animationOptions = {
        duration: reducedMotion.matches ? 0 : 420,
        easing: "cubic-bezier(.22,.68,.26,1)",
        fill: "forwards"
      };
      const outgoingAnimation = currentImage.animate(
        [{ transform: "translateX(0)", opacity: 1 }, { transform: `translateX(${outgoingOffset}%)`, opacity: 0 }],
        animationOptions
      );
      const incomingAnimation = incomingImage.animate(
        [{ transform: `translateX(${incomingOffset}%)`, opacity: 0 }, { transform: "translateX(0)", opacity: 1 }],
        animationOptions
      );
      swipeAnimations = [outgoingAnimation, incomingAnimation];
      Promise.all(swipeAnimations.map(animation => animation.finished)).then(() => {
        if (activeLightbox === lightbox && !isClosing) {
          pageIndex = nextIndex;
          currentImage.src = pages[pageIndex];
          pageCounter.textContent = `${String(pageIndex + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
          lightbox.setAttribute("aria-label", `${imageLabel}, page ${pageIndex + 1} of ${pages.length}`);
        }
        swipeAnimations.forEach(animation => animation.cancel());
        incomingImage.remove();
        swipeAnimations = [];
        isSwiping = false;
        scheduleNextCue();
      }, () => {
        incomingImage.remove();
        swipeAnimations = [];
        isSwiping = false;
        if (!isClosing) scheduleNextCue();
      });
    };

    const close = () => {
      if (activeLightbox !== lightbox || isClosing) return;
      isClosing = true;
      document.removeEventListener("keydown", handleKeydown);
      window.clearTimeout(cueDelay);
      window.clearInterval(cueInterval);
      window.clearTimeout(cueEnd);
      swipeAnimations.forEach(animation => animation.cancel());
      video?.pause();
      const duration = reducedMotion.matches ? 0 : 180;
      const animations = [
        lightbox.animate([{ opacity: 1 }, { opacity: 0 }], { duration, easing: "ease-in", fill: "forwards" }),
        visual.animate(
          [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.94)" }],
          { duration, easing: "ease-in", fill: "forwards" }
        )
      ];
      Promise.all(animations.map(animation => animation.finished)).then(() => {
        lightbox.remove();
        document.body.style.overflow = previousOverflow;
        document.documentElement.style.overflowY = previousRootOverflowY;
        activeLightbox = null;
        previousFocus.focus({ preventScroll: true });
      });
    };
    const handleKeydown = keyEvent => {
      if (keyEvent.key === "Escape") close();
      if (keyEvent.key === "Tab") {
        if (!video) {
          keyEvent.preventDefault();
        } else {
          keyEvent.preventDefault();
          (document.activeElement === video ? lightbox : video).focus();
        }
      }
      if (keyEvent.key === "ArrowRight") changePage(1);
      if (keyEvent.key === "ArrowLeft") changePage(-1);
    };

    if (isFlipbook) {
      visual.addEventListener("click", clickEvent => {
        const bounds = visual.getBoundingClientRect();
        if (clickEvent.clientX < bounds.left + bounds.width / 2) {
          changePage(-1);
        } else {
          changePage(1);
        }
      });
    }
    lightbox.addEventListener("click", clickEvent => {
      if (clickEvent.target === lightbox) close();
    });
    content.addEventListener("click", clickEvent => clickEvent.stopPropagation());
    document.addEventListener("keydown", handleKeydown);
    lightbox.focus({ preventScroll: true });
    const duration = reducedMotion.matches ? 0 : 220;
    lightbox.animate([{ opacity: 0 }, { opacity: 1 }], { duration, easing: "ease-out", fill: "forwards" });
    visual.animate(
      [{ opacity: 0, transform: "scale(.94)" }, { opacity: 1, transform: "scale(1)" }],
      { duration, easing: "ease-out", fill: "forwards" }
    );
    scheduleNextCue();
  };

  window.openContactLightbox = trigger => {
    if (activeLightbox) return;

    const lightbox = document.createElement("div");
    const content = document.createElement("div");
    const emailLink = document.createElement("a");
    const phoneButton = document.createElement("button");
    const phoneActions = document.createElement("div");
    const contactStatus = document.createElement("p");
    const mobileViewport = window.matchMedia("(max-width: 540px)");
    const phoneNumber = "(650) 868-6846";
    const phoneNumberForLinks = "+16508686846";
    lightbox.className = "gallery-image-lightbox";
    content.className = "contact-lightbox-content";
    emailLink.className = "contact-lightbox-email";
    emailLink.href = "mailto:eagbiggers@gmail.com";
    emailLink.textContent = "eagbiggers@gmail.com";
    phoneButton.className = "contact-lightbox-phone";
    phoneButton.type = "button";
    phoneButton.textContent = phoneNumber;
    phoneButton.setAttribute("aria-controls", "contact-phone-actions");
    phoneButton.setAttribute("aria-expanded", "false");
    phoneActions.id = "contact-phone-actions";
    phoneActions.className = "contact-phone-actions";
    phoneActions.setAttribute("aria-label", "Phone number options");
    phoneActions.hidden = true;
    const callLink = document.createElement("a");
    callLink.href = `tel:${phoneNumberForLinks}`;
    callLink.textContent = "Call";
    const messageLink = document.createElement("a");
    messageLink.href = `sms:${phoneNumberForLinks}`;
    messageLink.textContent = "Text";
    const contactLink = document.createElement("a");
    const contactCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Evan Biggers",
      `TEL;TYPE=CELL:${phoneNumberForLinks}`,
      "END:VCARD",
      ""
    ].join("\r\n");
    contactLink.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(contactCard)}`;
    contactLink.download = "Evan-Biggers.vcf";
    contactLink.textContent = "Add to contacts";
    phoneActions.append(callLink, messageLink, contactLink);
    contactStatus.className = "contact-lightbox-status";
    contactStatus.setAttribute("role", "status");
    contactStatus.setAttribute("aria-live", "polite");
    contactStatus.hidden = true;
    const setContactStatus = message => {
      contactStatus.textContent = message;
      contactStatus.hidden = !message;
    };
    const copyPhoneWithFallback = () => {
      const previousFocus = document.activeElement;
      const copyField = document.createElement("textarea");
      copyField.value = phoneNumber;
      copyField.setAttribute("readonly", "");
      copyField.style.position = "fixed";
      copyField.style.opacity = "0";
      document.body.append(copyField);
      copyField.focus();
      copyField.select();
      let copied = false;
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
      copyField.remove();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
      return copied;
    };
    const copyPhone = () => {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(phoneNumber).then(
          () => setContactStatus("Phone number copied to clipboard."),
          () => setContactStatus(
            copyPhoneWithFallback()
              ? "Phone number copied to clipboard."
              : "Could not copy the number. Please select and copy it manually."
          )
        );
        return;
      }
      setContactStatus(
        copyPhoneWithFallback()
          ? "Phone number copied to clipboard."
          : "Could not copy the number. Please select and copy it manually."
      );
    };
    const updatePhoneInteraction = () => {
      phoneButton.setAttribute(
        "aria-label",
        mobileViewport.matches ? "Choose an app for this phone number" : "Copy this phone number"
      );
      if (!mobileViewport.matches && !phoneActions.hidden) {
        phoneActions.hidden = true;
        phoneButton.setAttribute("aria-expanded", "false");
        if (phoneActions.contains(document.activeElement)) {
          phoneButton.focus({ preventScroll: true });
        }
      }
    };
    updatePhoneInteraction();
    phoneButton.addEventListener("click", () => {
      if (!mobileViewport.matches) {
        copyPhone();
        return;
      }
      const isOpening = phoneActions.hidden;
      phoneActions.hidden = !isOpening;
      phoneButton.setAttribute("aria-expanded", String(isOpening));
      setContactStatus(isOpening ? "Choose an app or save this contact." : "");
      if (isOpening) callLink.focus({ preventScroll: true });
    });
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Contact");
    lightbox.tabIndex = -1;
    content.append(emailLink, phoneButton, contactStatus, phoneActions);
    lightbox.append(content);
    document.body.append(lightbox);

    const previousOverflow = document.body.style.overflow;
    const previousRootOverflowY = document.documentElement.style.overflowY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousFocus = trigger instanceof HTMLElement ? trigger : document.activeElement;
    let isClosing = false;

    if (scrollbarWidth > 0) {
      document.documentElement.style.overflowY = "scroll";
    }
    document.body.style.overflow = "hidden";
    activeLightbox = lightbox;

    const close = () => {
      if (activeLightbox !== lightbox || isClosing) return;
      isClosing = true;
      document.removeEventListener("keydown", handleKeydown);
      mobileViewport.removeEventListener("change", updatePhoneInteraction);
      const duration = reducedMotion.matches ? 0 : 180;
      Promise.all([
        lightbox.animate([{ opacity: 1 }, { opacity: 0 }], { duration, easing: "ease-in", fill: "forwards" }).finished,
        content.animate(
          [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.94)" }],
          { duration, easing: "ease-in", fill: "forwards" }
        ).finished,
      ]).then(() => {
        lightbox.remove();
        document.body.style.overflow = previousOverflow;
        document.documentElement.style.overflowY = previousRootOverflowY;
        activeLightbox = null;
        if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
          previousFocus.focus({ preventScroll: true });
        }
      });
    };
    const handleKeydown = keyEvent => {
      if (keyEvent.key === "Escape") {
        close();
        return;
      }
      if (keyEvent.key !== "Tab") return;
      const focusableElements = [emailLink, phoneButton];
      if (!phoneActions.hidden) focusableElements.push(callLink, messageLink, contactLink);
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (keyEvent.shiftKey && document.activeElement === first) {
        keyEvent.preventDefault();
        last.focus();
      } else if (!keyEvent.shiftKey && document.activeElement === last) {
        keyEvent.preventDefault();
        first.focus();
      }
    };

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) close();
    });
    document.addEventListener("keydown", handleKeydown);
    mobileViewport.addEventListener("change", updatePhoneInteraction);
    emailLink.focus({ preventScroll: true });
    const duration = reducedMotion.matches ? 0 : 220;
    lightbox.animate([{ opacity: 0 }, { opacity: 1 }], { duration, easing: "ease-out", fill: "forwards" });
    content.animate(
      [{ opacity: 0, transform: "scale(.94)" }, { opacity: 1, transform: "scale(1)" }],
      { duration, easing: "ease-out", fill: "forwards" }
    );
  };

  window.addEventListener("click", event => {
    const trigger = event.target instanceof Element
      ? event.target.closest("[data-contact-open]")
      : null;
    if (!trigger) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.openContactLightbox(trigger);
  }, true);

  document.addEventListener("click", event => {
    const item = event.target instanceof Element
      ? event.target.closest(".image-grid .gallery-item")
      : null;
    if (!item) return;
    event.preventDefault();
    window.openGalleryImageLightbox(item);
  });
})();
