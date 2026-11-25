(() => {
  const homeView = document.getElementById("top");
  const routeView = document.getElementById("route-view");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const galleries = {
    general: {
      title: "Image collection",
      labels: [],
      ratios: []
    },
    website: {
      title: "Graphics and Branding Collection",
      labels: ["Torpedo", "Style Guide", "Scarlet Wire", "Sisyphus", "The Signal", "PathFinder", "RED Poster", "Donkey 2", "DDR Map File", "New Years", "Stationary", "CDC Poster"],
      ratios: ["11/17", "16/9", "510/641", "17/22", "4/3", "14/11", "11/17", "11/17", "14/11", "17/22", "17/11", "11/17"],
      items: {
        0: {
          title: "Sierra Nevada Torpedo IPA Rebrand",
          subtitle: "Photoshop",
          label: "Torpedo",
          images: ["Torpedo Artboards/TorpedoPrint.png", "Torpedo Artboards/TorpedoMock.png"]
        },
        1: {
          title: "Personal Brand Style Guide",
          subtitle: "Photography, InDesign, Photoshop, Illustrator, Typography",
          label: "Style Guide",
          images: Array.from({ length: 9 }, (_, index) =>
            `Style Guide Artboards/styleguid-${index + 1}.png`
          )
        },
        2: {
          title: "'Scarlet Wire': Theatrical Poster",
          subtitle: "Illustrator",
          label: "Scarlet Wire",
          images: ["scarletwiremock.png"]
        },
        3: {
          title: "'The Myth of Sisyphus': Book Cover",
          subtitle: "Photoshop",
          label: "Sisyphus",
          images: ["sisyphusmock.png"]
        },
        4: {
          title: "'The Signal': Musician Branding",
          subtitle: "Photography, Photoshop, Illustrator",
          label: "The Signal",
          images: [
            "The Signal/wind3.png",
            "The Signal/sigwin.png",
            "The Signal/bnmcov4.jpg",
            "The Signal/signalcover.png",
            "The Signal/signal517(1).png",
            "The Signal/329dj.png",
            "The Signal/Signalsky.png"
          ]
        },
        5: {
          title: "Capstone Poster: Daniel Gaskill",
          subtitle: "Photoshop, Illustrator",
          label: "PathFinder",
          images: ["PathFinder.png"]
        },
        6: {
          title: "'Three Colors: Red': Adaptation Poster",
          subtitle: "Illustrator, Typography",
          label: "RED Poster",
          images: ["REDposter-01.png"]
        },
        7: {
          title: "'Donkey': Musician Poster",
          subtitle: "Photoshop, Typography",
          label: "Donkey 2",
          images: ["donkey2.png"]
        },
        8: {
          title: "Capstone Poster: Alex Richason",
          subtitle: "Illustrator, Photoshop",
          label: "DDR Map File",
          images: ["ddrmapfile.png"]
        },
        9: {
          title: "New Years Festival Poster",
          subtitle: "Photoshop",
          label: "New Years",
          imageFit: "contain",
          images: ["NewYears.png"]
        },
        10: {
          title: "Chico State Stationary Branding",
          subtitle: "Photoshop",
          label: "Stationary",
          images: Array.from({ length: 5 }, (_, index) =>
            `Stationary Artboards/Stationary${index + 1}.png`
          )
        },
        11: {
          title: "Mock CDC Poster",
          subtitle: "Photoshop",
          label: "Poster design",
          images: ["cdcposter.png"]
        }
      }
    },
    packaging: {
      title: "Packaging and Physical Design Collection",
      labels: ["Fragrance", "Dunkocoa", "PureLife Redesign", "NASA"],
      ratios: ["17/11", "7/5", "8/5", "17/11"],
      items: {
        0: {
          title: "'Gallion': Mock Cosmetic Line",
          subtitle: "Photoshop",
          label: "Fragrance",
          images: [
            "Fragrance Artboards/Fragrance_1.png",
            "Fragrance Artboards/Fragrance_2.png",
            "Fragrance Artboards/Fragrance_3.png"
          ]
        },
        1: {
          title: "'Dunkocoa': Mock Chocolate Line",
          subtitle: "Illustrator, Photoshop",
          label: "Packaging mockup",
          images: ["DunkocoaFinalLineMock.png"]
        },
        2: {
          title: "'Pure Life': Water Bottle Packaging Redesign",
          subtitle: "Material Demonstration, Photoshop",
          label: "PureLife Redesign",
          images: ["PureLifeRedesign.png"]
        },
        3: {
          title: "NASA Brand Identity Application",
          subtitle: "InDesign, Illustrator",
          label: "NASA",
          images: Array.from({ length: 4 }, (_, index) =>
            `NASA Artboards/nasa${index + 1}.png`
          )
        }
      }
    },
    editorial: {
      title: "User Interface and Experience Collection",
      labels: ["Smart Campus", "Following the Thread", "CloseKnit"],
      ratios: ["819/1775", "2/1", "4/3"],
      items: {
        0: {
          title: "'Smart Campus': Application",
          subtitle: "Figma, Photoshop",
          label: "Smart Campus",
          images: [
            "Smart Campus Artboards/scfinal1.png",
            "Smart Campus Artboards/scfinal2.png",
            "Smart Campus Artboards/scfinal3.png",
            "Smart Campus Artboards/scfinal4.png",
            "Smart Campus Artboards/scfinal5.png",
            "Smart Campus Artboards/scfinal6.png",
            "Smart Campus Artboards/scfinal7.png"
          ]
        },
        1: {
          title: "'Following The Thread': Exhibit",
          subtitle: "Photoshop, Illustrator",
          label: "Following the Thread",
          images: [
            "FollowingTheThread Artboards/FollowingTheThreadTitle.png",
            "FollowingTheThread Artboards/FollowingTheThreadSocial.png",
            "FollowingTheThread Artboards/FollowingTheThreadMock.png"
          ]
        },
        2: {
          title: "'CloseKnit': Application",
          subtitle: "Figma, Photoshop, Photography",
          label: "CloseKnit",
          images: [
            "CloseKnit Artboards/CKP.png",
            "CloseKnit Artboards/ckframe1.png",
            "CloseKnit Artboards/ckframe2.png",
            "CloseKnit Artboards/ckframe3.png",
            "CloseKnit Artboards/ckframe4.png",
            "CloseKnit Artboards/ckframe5.png",
            "CloseKnit Artboards/ckframe6.png"
          ]
        }
      }
    },
    videography: {
      title: "Videography Collection",
      labels: ["Video project", "Video project", "Video project"],
      ratios: ["16/9", "2240/1488", "4/3"],
      items: {
        0: {
          title: "'The Signal': Promotional Video",
          subtitle: "Videography, Music Production, TouchDesigner, After Effects, Premiere Pro",
          label: "Video project",
          video: "heartvidnew.mp4",
          description: "Heart video."
        },
        1: {
          title: "'Lifespan': Typographic Video",
          subtitle: "Videography, Photography, Music Production, Typography, After Effects, Premiere Pro",
          label: "Video project",
          video: "Project4_Lifespan.mp4",
          description: "Project 4: Lifespan video."
        },
        2: {
          title: "'Burning Youth Movement': Promotional Video",
          subtitle: "Videography, Music Production, TouchDesigner, Premiere Pro",
          label: "Video project",
          video: "202dktease.mp4",
          description: "202D KTE teaser video."
        }
      }
    }
  };

  const projects = {
    brand: {
      title: "KCSC Radio",
      subtitle: "Brand Identity and Advertising Graphics Project",
      description: "This series of graphics was produced for KCSC Radio during my time as an in-house graphic designer. This campaign spans several formats and purposes, including event posters, radio show promotional graphics, a recruitment poster, and Youthquake Live Session video, which I filmed, edited, created the thumbnail for, and designed the set and lighting for. As a graphic designer, I was tasked with developing a brand identity, improving industry and audience outreach, and improving social media presence for the radio station. Some of the most important principles I took from this role was respecting existing brand styling guidelines, prioritizing clarity and legibility for audiences spanning digital and print mediums, and maintaining a distinct hierarchy between elements to ensure an efficient and effective communication of important or relevant information.",
      showSlideDescription: false,
      slides: [
        { image: "KCSC Artboards/kcsc_wantsyou.png", subtitle: "Wants You", description: "KCSC Radio advertising graphic." },
        { image: "KCSC Artboards/kcsc_makers.png", subtitle: "Makers", description: "KCSC Radio advertising graphic." },
        { image: "KCSC Artboards/kcsc_youthquake.png", youtube: "https://www.youtube.com/embed/uJsvPuzQ-Zs", subtitle: "Youthquake", description: "KCSC Radio advertising graphic." },
        { image: "KCSC Artboards/kcsc_holiday.png", subtitle: "Holiday", description: "KCSC Radio advertising graphic." },
        { image: "KCSC Artboards/kcsc_chicochella.png", subtitle: "Chicochella", description: "KCSC Radio advertising graphic." },
        { image: "KCSC Artboards/kcsc_bargainbin.png", subtitle: "Bargain Bin", description: "KCSC Radio advertising graphic." }
      ]
    },
    mobile: {
      title: "Vyzee",
      subtitle: "Consumer Packaged Goods Project",
      description: "This series documents the packaging system developed for Vyzee, a sparkling water brand, and covers the full pipeline from flat production artwork to finished presentation mockups. " +
        "The primary can design is shown as a flat label layout wrapped around a rendered 3D can, and is extended into a three-flavor lineup using a color-coded system in which the flavor name, lid band, and accent color change while the logo, layout, and typographic structure remain constant. " +
        "The can label includes the required regulatory content, such as a Nutrition Facts panel, an ingredients statement, and a serving size declaration. " +
        "Two corrugated shipper cartons, a single-flavor Pomegranate carton and a multi-flavor Variety Pack carton, are presented as dieline templates with specified manufacturing dimensions, B-flute material, bleed, trim, and crease lines, then as rendered 3D mockups to show how the flat artwork folds into a finished structure. " +
        "The cartons repeat the brand's logo, flavor identification, nutrition panel, and marketing copy, and the variety pack adds a flavor roster and can imagery to communicate its contents. " +
        "A separate 6-pack shipper graphic rounds out the system as a flat-format retail packaging panel. " +
        "Taken together, the work demonstrates production-ready file preparation, scalable system design across SKUs and pack formats, regulatory labeling, and the use of mockups to present the packaging in context. " +
        "The main principles and lessons I took from this project were the importance and intricacy of dimensional accuracy and material consideration when approaching a comprehensive Consumer Packaged Goods project.",
      showSlideDescription: false,
      slides: [
        { image: "Vyzee Artboards/vyz_allcans.png", subtitle: "Can lineup", description: "The full sparkling water range brings the identity together." },
        { image: "Vyzee Artboards/vyz_boxmock2.png", subtitle: "Box mockup", description: "A rendered box mockup presents the Vyzee packaging in context." },
        { image: "Vyzee Artboards/vyz_box2.png", subtitle: "Packaging detail", description: "A second box design applies the system to another package format." },
        { image: "Vyzee Artboards/vyz_maincan.png", subtitle: "Main can", description: "The Vyzee sparkling water can anchors the project’s visual identity." },
        { image: "Vyzee Artboards/vyz_boxmock1.png", subtitle: "Box mockup", description: "A rendered box mockup presents another view of the Vyzee packaging." },
        { image: "Vyzee Artboards/vyz_box1.png", subtitle: "Retail box", description: "Retail packaging extends the brand across the product experience." },
        { image: "Vyzee Artboards/vyz_shipper.png", subtitle: "Shipping box", description: "Branded shipping packaging completes the set of applications." }
      ]
    },
    system: {
      title: "Replug",
      subtitle: "Capstone Project",
      description: "This series documents Replug, a capstone campaign built around a single social-change objective: moving audiences away from corporate, algorithm-driven platforms and toward the independent web. " +
        "The campaign is organized into three strategic categories, shown as section dividers: Social Space, Event Space, and Digital Space, with an additional Out of House category for outdoor advertising. " +
        "Each category applies a different channel to the same call to action. " +
        "Social Space comprises Instagram-format content, including a feed post mockup and square posts that pose questions to the viewer, as well as physical promotional pins. " +
        "Event Space comprises a \"404: Page Not Found\" memoriam-style exhibit, presented as a spatial mockup with wall-mounted informational panels documenting defunct web services and the independent alternatives that succeeded them, plus a central title panel and keyboard interface. " +
        "Digital Space is anchored by replug.neocities.org, a custom-coded, fully operational website that I built and deployed on Neocities to serve as the campaign's hub. It is a live, working site rather than a mockup, and includes onboarding resources, curated directories of independent web communities, a functional guestbook, a navigation sidebar, and statistical context on the problem, all hand-built in the vernacular of the independent web it promotes. " +
        "Out of House comprises billboard and bus shelter advertisements that use comparative, question-based copy to drive viewers to the site. " +
        "The system is unified by a consistent wordmark, tagline (\"Join the Indie Web\"), and call-to-action URL across every touchpoint. " +
        "The series is bookended by a cover title slide and a panoramic social media carousel that promotes the capstone presentation event. " +
        "Its sequential slides introduce the designer, state the problem and the community-driven response, pose the campaign's central question, and close with the event details. " +
        "Mockups are used throughout to present each deliverable in realistic context, demonstrating a multi-channel, research-informed approach that pairs an awareness strategy with a tangible, actionable destination for the audience. " +
        "The main principles and lessons I learned from this project was the attention to detail and management that is needed to maintain a consistent brand identity across mediums and campaigns as well as the effective strategies for mobilizing, incentivizing, and raising awareness in users in a persuasive campaign.",
      showSlideDescription: false,
      slides: [
        { image: "Replug Artboards/ReplugCover.png", subtitle: "Cover", description: "Replug capstone project." },
        { image: "Replug Artboards/14rep.png", subtitle: "Artboard 14", description: "Replug capstone project." },
        { image: "Replug Artboards/15rep.png", subtitle: "Artboard 15", description: "Replug capstone project." },
        { image: "Replug Artboards/10rep.png", subtitle: "Artboard 10", description: "Replug capstone project." },
        { image: "Replug Artboards/11rep.png", subtitle: "Artboard 11", description: "Replug capstone project." },
        { image: "Replug Artboards/16rep.png", subtitle: "Artboard 16", description: "Replug capstone project." },
        { image: "Replug Artboards/19rep.png", subtitle: "Artboard 19", description: "Replug capstone project." },
        { image: "Replug Artboards/17rep.png", subtitle: "Artboard 17", description: "Replug capstone project." },
        { image: "Replug Artboards/18rep.png", subtitle: "Artboard 18", description: "Replug capstone project." },
        { image: "Replug Artboards/6rep.png", subtitle: "Artboard 6", description: "Replug capstone project." },
        { image: "Replug Artboards/9rep.png", subtitle: "Artboard 9", description: "Replug capstone project." },
        { image: "Replug Artboards/12rep.png", subtitle: "Artboard 12", description: "Replug capstone project." },
        { image: "Replug Artboards/13rep.png", subtitle: "Artboard 13", description: "Replug capstone project." },
        { image: "Replug Artboards/ReplugSMP.png", subtitle: "Replug SMP", description: "Replug capstone project." }
      ]
    }
  };

  const collectionDetails = {
    website: "Add a description for this website image.",
    packaging: "Add a description for this packaging image.",
    editorial: "Add a description for this editorial image."
  };
  let activeArrowHandler = null;
  let pendingTransition = null;
  let isTransitioning = false;
  let previousRoute = null;
  let detailEntryOrigin = null;
  let galleryEntryOrigin = null;

  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

  const portfolioUrl = () => new URL("portfolio.html", window.location.href);

  function setScrollPosition(top) {
    window.scrollTo({ left: 0, top, behavior: "instant" });
  }

  const boundsOf = element => {
    const rect = element.getBoundingClientRect();
    return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
  };

  function getGallerySlideIndex(cycler, galleryId) {
    const index = Number(cycler?.dataset.slideIndex);
    const slideCount = cycler?.children.length;
    if (!cycler || !Number.isInteger(index) || index < 0 || index >= slideCount) {
      throw new Error(`Could not identify the displayed slide for gallery "${galleryId}".`);
    }
    return index;
  }

  function retainActiveGallerySlide(cycler) {
    const index = Number(cycler?.dataset.slideIndex);
    if (!cycler || !Number.isInteger(index) || index < 0 || index >= cycler.children.length) {
      throw new Error("Could not identify the displayed gallery thumbnail slide.");
    }
    [...cycler.children].forEach((slide, slideIndex) => {
      if (slideIndex !== index) slide.remove();
    });
  }

  const cssProperty = property => property.replace(/-([a-z])/g, (_, character) => character.toUpperCase());
  const morphKeyframeCount = 65;
  const lastMorphKeyframe = morphKeyframeCount - 1;

  function easedProgress(progress, easing) {
    const bezier = easing?.match(/cubic-bezier\(([^)]+)\)/)?.[1].split(",").map(Number);
    if (!bezier || bezier.length !== 4) return progress;
    const [x1, y1, x2, y2] = bezier;
    const coordinate = (t, first, second) =>
      3 * (1 - t) ** 2 * t * first + 3 * (1 - t) * t ** 2 * second + t ** 3;
    let low = 0;
    let high = 1;
    for (let iteration = 0; iteration < 16; iteration++) {
      const middle = (low + high) / 2;
      if (coordinate(middle, x1, x2) < progress) low = middle;
      else high = middle;
    }
    return coordinate((low + high) / 2, y1, y2);
  }

  function cloneWithComputedStyles(element, removeSelector) {
    const clone = element.cloneNode(true);
    const sources = [element, ...element.querySelectorAll("*")];
    const targets = [clone, ...clone.querySelectorAll("*")];
    sources.forEach((source, index) => {
      const target = targets[index];
      if (!target) return;
      const computed = window.getComputedStyle(source);
      for (const property of computed) target.style.setProperty(property, computed.getPropertyValue(property));
      target.style.setProperty("transition", "none", "important");
      target.style.setProperty("animation", "none", "important");
      target.removeAttribute("id");
    });
    if (removeSelector) clone.querySelectorAll(removeSelector).forEach(node => node.remove());
    clone.setAttribute("aria-hidden", "true");
    return clone;
  }

  function captureLiveStyles(element) {
    return [element, ...element.querySelectorAll("*")].map(node => {
      const computed = window.getComputedStyle(node);
      return {
        element: node,
        inline: node.getAttribute("style"),
        attributes: [...node.attributes].map(attribute => [attribute.name, attribute.value]),
        children: [...node.childNodes],
        computed: [...computed].map(property => [property, computed.getPropertyValue(property)])
      };
    });
  }

  function applyLiveStyles(styles) {
    styles.forEach(({ element, computed }) => {
      computed.forEach(([property, value]) => element.style.setProperty(property, value));
    });
  }

  function restoreLiveStyles(styles) {
    styles.forEach(({ element, inline }) => {
      if (inline === null) element.removeAttribute("style");
      else element.setAttribute("style", inline);
    });
  }

  function restoreLiveGalleryCard(liveCard, preserveImage = null, preserveImageIndex = -1) {
    if (!liveCard) return null;
    const { parent, nextSibling, styles } = liveCard;
    let replacedHomeImage = null;
    [...styles].reverse().forEach(({ element, children }) => element.replaceChildren(...children));
    styles.forEach(({ element, attributes }) => {
      [...element.attributes].forEach(attribute => element.removeAttribute(attribute.name));
      attributes.forEach(([name, value]) => element.setAttribute(name, value));
    });
    restoreLiveStyles(styles);
    if (preserveImage) {
      // Keep the decoded gallery asset connected while restoring the home card.
      const activeSlide = liveCard.element.querySelectorAll(".gallery-cycler .gallery-slide")[preserveImageIndex];
      const homeImage = activeSlide?.querySelector("img");
      if (!Number.isInteger(preserveImageIndex) || !homeImage) {
        throw new Error("Could not preserve the active gallery image for the homepage return.");
      }
      replacedHomeImage = homeImage;
      preserveImage.className = homeImage.className;
      const homeImageStyle = homeImage.getAttribute("style");
      if (homeImageStyle === null) preserveImage.removeAttribute("style");
      else preserveImage.setAttribute("style", homeImageStyle);
      homeImage.replaceWith(preserveImage);
    }
    if (liveCard.element.parentNode !== parent) {
      parent.insertBefore(liveCard.element, nextSibling?.parentNode === parent ? nextSibling : null);
    }
    liveCard.inGallery = false;
    return replacedHomeImage;
  }

  function placeTransitionClone(element, bounds, zIndex = "10003", parent = document.body) {
    const style = {
      width: `${bounds.width}px`,
      height: `${bounds.height}px`,
      margin: "0",
      zIndex,
      pointerEvents: "none"
    };
    if (parent === document.body) {
      Object.assign(style, {
        position: "fixed",
        left: `${bounds.x}px`,
        top: `${bounds.y}px`
      });
    } else {
      const parentBounds = parent.getBoundingClientRect();
      const scaleX = parent.offsetWidth ? parentBounds.width / parent.offsetWidth : 1;
      const scaleY = parent.offsetHeight ? parentBounds.height / parent.offsetHeight : 1;
      Object.assign(style, {
        position: "absolute",
        left: `${(bounds.x - parentBounds.left) / scaleX - parent.clientLeft}px`,
        top: `${(bounds.y - parentBounds.top) / scaleY - parent.clientTop}px`,
        width: `${bounds.width / scaleX}px`,
        height: `${bounds.height / scaleY}px`
      });
    }
    Object.assign(element.style, style);
    parent.append(element);
    return element;
  }

  async function playCardTextExit(origin) {
    const textEffects = origin?.textEffects || [];
    const textParent = origin?.textParent;
    if (!textEffects.length || !textParent || reducedMotion.matches) return;
    [...textParent.children]
      .filter(element => element.matches(".cap, small"))
      .forEach(element => { element.style.opacity = "0"; });
    try {
      const animations = textEffects.map(({ element, bounds, offset }) => {
        placeTransitionClone(element, bounds, "0", textParent);
        return element.animate(
          [{ transform: "translateY(0)", opacity: 1 }, { transform: `translateY(${offset}px)`, opacity: 0 }],
          { duration: 220, easing: "ease-in", fill: "forwards" }
        );
      });
      await Promise.all(animations.map(animation => animation.finished));
    } finally {
      textEffects.forEach(({ element }) => element.remove());
    }
  }

  function playGalleryHomeIntroExit(element) {
    if (!element || reducedMotion.matches) return;
    return element.animate(
      [
        { transform: "translateY(0)", opacity: 1, filter: "blur(0)" },
        { transform: "translateY(-12vh)", opacity: 0, filter: "blur(4px)" }
      ],
      { duration: 360, easing: "ease-in", fill: "forwards" }
    ).finished;
  }

  async function playGalleryCellsExit(origin) {
    const cells = origin?.galleryExitCells || [];
    if (!cells.length || reducedMotion.matches) return;
    const animations = cells.map(({ element }) =>
      element.animate(
        [
          { transform: "scale(1)", opacity: 1, filter: "blur(0)" },
          { transform: "scale(.55)", opacity: 0, filter: "blur(4px)" }
        ],
        { duration: 360, easing: "ease-in", fill: "forwards" }
      )
    );
    await Promise.all(animations.map(animation => animation.finished));
  }

  function captureCardTextEntrance(card, image) {
    const imageTop = image.getBoundingClientRect().top;
    const cardBounds = card.getBoundingClientRect();
    const scaleY = card.offsetHeight ? cardBounds.height / card.offsetHeight : 1;
    return [...card.children]
      .filter(element => element.matches(".cap, small"))
      .map(element => ({
        bounds: boundsOf(element),
        offset: (imageTop - element.getBoundingClientRect().bottom) / scaleY,
        element: cloneWithComputedStyles(element)
      }));
  }

  async function playCardTextEntrance(textEffects, card) {
    if (!textEffects?.length || reducedMotion.matches) return;
    const textParent = card && homeView.contains(card) ? card : document.body;
    const zIndex = textParent === card ? "0" : "10004";
    const animations = textEffects.map(({ element, bounds, offset }) => {
      placeTransitionClone(element, bounds, zIndex, textParent);
      return element.animate(
        [{ transform: `translateY(${offset}px)`, opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
        { duration: 360, easing: "ease-out", fill: "both" }
      );
    });
    try {
      await Promise.all(animations.map(animation => animation.finished));
    } finally {
      textEffects.forEach(({ element }) => element.remove());
    }
  }

  function animateBounds(element, from, to, duration = 650, easing = "cubic-bezier(.2,.75,.2,1)", fit) {
    const interpolate = (start, end, progress) => start + (end - start) * progress;
    const fromStyle = window.getComputedStyle(element);
    const targetStyle = fit?.target ? window.getComputedStyle(fit.target) : fromStyle;
    const borderSides = ["top", "right", "bottom", "left"];
    const borderFrom = borderSides.map(side => parseFloat(fromStyle.getPropertyValue(`border-${side}-width`)) || 0);
    const borderTo = borderSides.map(side => parseFloat(targetStyle.getPropertyValue(`border-${side}-width`)) || 0);
    const corners = ["top-left", "top-right", "bottom-right", "bottom-left"];
    const radiiFrom = corners.map(corner => parseFloat(fromStyle.getPropertyValue(`border-${corner}-radius`)) || 0);
    const radiiTo = corners.map(corner => parseFloat(targetStyle.getPropertyValue(`border-${corner}-radius`)) || 0);

    Object.assign(element.style, {
      position: "fixed",
      left: `${from.x}px`,
      top: `${from.y}px`,
      width: `${from.width}px`,
      height: `${from.height}px`,
      margin: "0",
      transformOrigin: "top left",
      zIndex: "10003",
      pointerEvents: "none",
      willChange: "transform"
    });
    document.body.append(element);
    const image = fit?.animateImage !== false && fit && element.querySelector("img");
    const naturalWidth = image?.naturalWidth;
    const naturalHeight = image?.naturalHeight;
    if (image && naturalWidth && naturalHeight) {
      Object.assign(image.style, {
        position: "absolute",
        inset: "auto",
        left: "50%",
        top: "50%",
        right: "auto",
        bottom: "auto",
        objectFit: "fill",
        transform: "translate(-50%, -50%)"
      });
    }

    const keyframes = Array.from({ length: morphKeyframeCount }, (_, index) => {
      const offset = index / lastMorphKeyframe;
      const progress = index === 0 ? 0 : index === lastMorphKeyframe ? 1 : easedProgress(offset, easing);
      const scaleX = interpolate(1, to.width / from.width, progress);
      const scaleY = interpolate(1, to.height / from.height, progress);
      const frame = {
        offset,
        transform: `translate(${(to.x - from.x) * progress}px, ${(to.y - from.y) * progress}px) scale(${scaleX}, ${scaleY})`
      };
      borderSides.forEach((side, sideIndex) => {
        const scale = side === "left" || side === "right" ? scaleX : scaleY;
        frame[cssProperty(`border-${side}-width`)] = `${interpolate(borderFrom[sideIndex], borderTo[sideIndex], progress) / scale}px`;
      });
      corners.forEach((corner, cornerIndex) => {
        const radius = interpolate(radiiFrom[cornerIndex], radiiTo[cornerIndex], progress);
        frame[cssProperty(`border-${corner}-radius`)] = `${radius / scaleX}px ${radius / scaleY}px`;
      });
      return frame;
    });

    let imageAnimation;
    if (image && naturalWidth && naturalHeight) {
      const fitScale = (width, height, objectFit) => objectFit === "cover"
        ? Math.max(width / naturalWidth, height / naturalHeight)
        : Math.min(width / naturalWidth, height / naturalHeight);
      const imageFitFrames = keyframes.map(({ offset }, index) => {
        const progress = index === 0 ? 0 : index === lastMorphKeyframe ? 1 : easedProgress(offset, easing);
        const scaleX = interpolate(1, to.width / from.width, progress);
        const scaleY = interpolate(1, to.height / from.height, progress);
        const width = from.width * scaleX;
        const height = from.height * scaleY;
        const scale = interpolate(fitScale(width, height, fit.from), fitScale(width, height, fit.to), progress);
        return {
          offset,
          left: `${from.width / 2}px`,
          top: `${from.height / 2}px`,
          width: `${naturalWidth * scale / scaleX}px`,
          height: `${naturalHeight * scale / scaleY}px`
        };
      });
      imageAnimation = image.animate(imageFitFrames, { duration, easing: "linear", fill: "forwards" });
    }
    const animation = element.animate(keyframes, { duration, easing: "linear", fill: "forwards" });
    return { animation, imageAnimation };
  }

  function animateCellBounds(element, from, to, frame, duration = 650) {
    const frameElement = element.querySelector(frame.selector);
    const image = frameElement?.querySelector("img");
    const parentStyle = window.getComputedStyle(element);
    const frameStyle = frameElement ? window.getComputedStyle(frameElement) : null;
    const targetParentStyle = window.getComputedStyle(frame.targetCell);
    const targetFrameStyle = window.getComputedStyle(frame.targetFrame);
    const sides = ["top", "right", "bottom", "left"];
    const corners = ["top-left", "top-right", "bottom-right", "bottom-left"];
    const interpolate = (start, end, progress) => start + (end - start) * progress;
    const parentBorderFrom = sides.map(side => parseFloat(parentStyle.getPropertyValue(`border-${side}-width`)) || 0);
    const parentBorderTo = sides.map(side => parseFloat(targetParentStyle.getPropertyValue(`border-${side}-width`)) || 0);
    const frameBorderFrom = sides.map(side => parseFloat(frameStyle?.getPropertyValue(`border-${side}-width`)) || 0);
    const frameBorderTo = sides.map(side => parseFloat(targetFrameStyle.getPropertyValue(`border-${side}-width`)) || 0);
    const frameRadiusFrom = corners.map(corner => parseFloat(frameStyle?.getPropertyValue(`border-${corner}-radius`)) || 0);
    const frameRadiusTo = corners.map(corner => parseFloat(targetFrameStyle.getPropertyValue(`border-${corner}-radius`)) || 0);
    if (frameElement && frameStyle) {
      let ancestor = frameElement.parentElement;
      while (ancestor && ancestor !== element) {
        Object.assign(ancestor.style, { position: "static", overflow: "visible", transform: "none" });
        ancestor = ancestor.parentElement;
      }
      if (frameElement.matches(".gallery-slide")) {
        [...frameElement.parentElement.children]
          .filter(slide => slide !== frameElement)
          .forEach(slide => { slide.style.visibility = "hidden"; });
      }
      Object.assign(frameElement.style, {
        position: "absolute",
        left: `${frame.from.x - from.x - parentBorderFrom[3]}px`,
        top: `${frame.from.y - from.y - parentBorderFrom[0]}px`,
        width: `${frame.from.width}px`,
        height: `${frame.from.height}px`,
        right: "auto",
        bottom: "auto",
        margin: "0",
        boxSizing: "border-box",
        aspectRatio: "auto",
        overflow: "hidden",
        transform: "none"
      });
    }

    const parentMotion = animateBounds(element, from, to, duration, undefined, { target: frame.targetCell, animateImage: false });
    let frameAnimation;
    let imageAnimation;
    if (frameElement && frameStyle) {
      const naturalWidth = image?.naturalWidth;
      const naturalHeight = image?.naturalHeight;
      const startFit = frame.fitFrom || (image ? window.getComputedStyle(image).objectFit : "cover");
      const endFit = frame.fitTo || startFit;
      const animateImageScale = frame.preserveAspectRatio || startFit !== endFit;
      // Counter the cell's non-uniform scale so the frame, not the image, controls cropping.
      if (image && naturalWidth && naturalHeight && animateImageScale) {
        Object.assign(image.style, {
          position: "absolute",
          inset: "auto",
          left: "50%",
          top: "50%",
          right: "auto",
          bottom: "auto",
          objectFit: "fill",
          objectPosition: "center",
          transform: "translate(-50%, -50%)"
        });
      }
      const fitScale = (width, height, objectFit) => objectFit === "cover"
        ? Math.max(width / naturalWidth, height / naturalHeight)
        : Math.min(width / naturalWidth, height / naturalHeight);
      const keyframes = Array.from({ length: morphKeyframeCount }, (_, index) => {
        const offset = index / lastMorphKeyframe;
        const progress = index === 0 ? 0 : index === lastMorphKeyframe ? 1 : easedProgress(offset, "cubic-bezier(.2,.75,.2,1)");
        const scaleX = interpolate(1, to.width / from.width, progress);
        const scaleY = interpolate(1, to.height / from.height, progress);
        const parentX = interpolate(from.x, to.x, progress);
        const parentY = interpolate(from.y, to.y, progress);
        const frameX = interpolate(frame.from.x, frame.to.x, progress);
        const frameY = interpolate(frame.from.y, frame.to.y, progress);
        const frameWidth = interpolate(frame.from.width, frame.to.width, progress);
        const frameHeight = interpolate(frame.from.height, frame.to.height, progress);
        const frameLocalWidth = frameWidth / scaleX;
        const frameLocalHeight = frameHeight / scaleY;
        const frameBorderWidths = sides.map((side, sideIndex) =>
          interpolate(frameBorderFrom[sideIndex], frameBorderTo[sideIndex], progress) / (side === "left" || side === "right" ? scaleX : scaleY)
        );
        const frameKeyframe = {
          offset,
          left: `${(frameX - parentX - interpolate(parentBorderFrom[3], parentBorderTo[3], progress)) / scaleX}px`,
          top: `${(frameY - parentY - interpolate(parentBorderFrom[0], parentBorderTo[0], progress)) / scaleY}px`,
          width: `${frameLocalWidth}px`,
          height: `${frameLocalHeight}px`
        };
        sides.forEach((side, sideIndex) => {
          frameKeyframe[cssProperty(`border-${side}-width`)] = `${frameBorderWidths[sideIndex]}px`;
        });
        corners.forEach((corner, cornerIndex) => {
          const radius = interpolate(frameRadiusFrom[cornerIndex], frameRadiusTo[cornerIndex], progress);
          frameKeyframe[cssProperty(`border-${corner}-radius`)] = `${radius / scaleX}px ${radius / scaleY}px`;
        });
        return frameKeyframe;
      });
      frameAnimation = frameElement.animate(keyframes, { duration, easing: "linear", fill: "forwards" });
      if (image && naturalWidth && naturalHeight && animateImageScale) {
        const imageKeyframes = keyframes.map(({ offset }, index) => {
          const progress = index === 0 ? 0 : index === lastMorphKeyframe ? 1 : easedProgress(offset, "cubic-bezier(.2,.75,.2,1)");
          const scaleX = interpolate(1, to.width / from.width, progress);
          const scaleY = interpolate(1, to.height / from.height, progress);
          const frameWidth = interpolate(frame.from.width, frame.to.width, progress);
          const frameHeight = interpolate(frame.from.height, frame.to.height, progress);
          const imageScale = interpolate(
            fitScale(frameWidth, frameHeight, startFit),
            fitScale(frameWidth, frameHeight, endFit),
            progress
          );
          return {
            offset,
            width: `${naturalWidth * imageScale / scaleX}px`,
            height: `${naturalHeight * imageScale / scaleY}px`
          };
        });
        imageAnimation = image.animate(imageKeyframes, { duration, easing: "linear", fill: "forwards" });
      }
    }
    return { ...parentMotion, frameAnimation, imageAnimation };
  }

  function handoffLiveGalleryImage(origin, targetImage) {
    const image = origin.liveThumbnailImage;
    if (!image) return;
    if (!targetImage) {
      throw new Error("Could not restore the live gallery image to its homepage thumbnail.");
    }
    image.className = targetImage.className;
    const targetStyle = targetImage.getAttribute("style");
    if (targetStyle === null) image.removeAttribute("style");
    else image.setAttribute("style", targetStyle);
    targetImage.replaceWith(image);
    origin.liveThumbnailImage = null;
  }

  async function playDetailEntrance(origin) {
    if (!origin || reducedMotion.matches) return;
    isTransitioning = true;
    const showcase = routeView.querySelector(".cell.showcase");
    const stage = routeView.querySelector(".image-stage");
    const toolbar = routeView.querySelector(".carousel-toolbar");
    const meta = routeView.querySelector(".image-meta");
    const description = routeView.querySelector(".image-overlay p");
    const shell = cloneWithComputedStyles(origin.card, ".cap, small");
    showcase.style.opacity = "0";
    meta.style.opacity = "0";
    description.style.opacity = "0";
    if (!toolbar.hidden) toolbar.style.visibility = "hidden";
    shell.style.opacity = "0";
    placeTransitionClone(shell, origin.cell, "10003");
    try {
      await playCardTextExit(origin);
      routeView.style.removeProperty("opacity");
      shell.style.opacity = "1";
      const contentMotion = [
        meta.animate([{ transform: "translateY(100vh)", opacity: 0, filter: "blur(4px)" }, { transform: "translateY(0)", opacity: 1, filter: "blur(0)" }], { duration: 360, easing: "ease-out", fill: "both" }),
        description.animate([{ transform: "translateY(100vh)", opacity: 0, filter: "blur(4px)" }, { transform: "translateY(0)", opacity: 1, filter: "blur(0)" }], { duration: 360, easing: "ease-out", fill: "both" })
      ];
      const homeExit = playHomeExit(origin);
      const galleryIntroExit = playGalleryIntroExit(origin);
      const galleryBackRowExit = playGalleryBackRowExit(origin);
      await Promise.all([homeExit, galleryIntroExit, galleryBackRowExit]);
      const shellMotion = animateCellBounds(shell, origin.cell, boundsOf(showcase), {
        selector: ".ph",
        from: origin.thumbnailBounds,
        to: boundsOf(stage),
        targetCell: showcase,
        targetFrame: stage,
        fitFrom: origin.fit,
        fitTo: window.getComputedStyle(stage.querySelector("img")).objectFit
      });
      await Promise.all([
        shellMotion.animation.finished,
        shellMotion.frameAnimation?.finished,
        shellMotion.imageAnimation?.finished,
        ...contentMotion.map(animation => animation.finished)
      ].filter(Boolean));
      meta.style.removeProperty("opacity");
      description.style.removeProperty("opacity");
      await Promise.all([
        showcase.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: "ease-out", fill: "both" }).finished,
        shell.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-out", fill: "forwards" }).finished
      ]);
      if (!toolbar.hidden) {
        toolbar.style.removeProperty("visibility");
        await toolbar.animate(
          [{ transform: "translateY(-100%)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
          { duration: 420, easing: "ease-out" }
        ).finished;
      }
    } finally {
      shell.remove();
      routeView.style.removeProperty("opacity");
      homeView.hidden = true;
      showcase.style.opacity = "";
      meta.style.removeProperty("opacity");
      description.style.removeProperty("opacity");
      toolbar.style.removeProperty("visibility");
      isTransitioning = false;
    }
  }

  async function playDetailReturn(origin, target) {
    if (!origin || !target || reducedMotion.matches) return;
    isTransitioning = true;
    const shell = origin.shell;
    const targetBounds = boundsOf(target.image);
    const targetCellBounds = boundsOf(target.cell);
    target.image.style.opacity = "0";
    target.cell.style.opacity = "0";
    const textEffects = captureCardTextEntrance(target.cell, target.image);
    const shellBackground = origin.shellBackground;
    if (shellBackground) placeTransitionClone(shellBackground, origin.showcaseBounds, "10001");
    placeTransitionClone(shell, origin.showcaseBounds, "10003");
    if (origin.carousel) {
      const carouselTop = Math.max(0, origin.carousel.bounds.y - origin.showcaseBounds.y);
      const clippedHeight = Math.max(0, origin.showcaseBounds.height - carouselTop);
      shell.style.clipPath = `inset(0 0 ${clippedHeight}px 0)`;
    }
    const carouselMotion = origin.carousel ? (() => {
      origin.carousel.element.style.opacity = "0";
      placeTransitionClone(origin.carousel.element, origin.carousel.bounds, "10002");
      return origin.carousel.element.animate(
        [{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(-100%)", opacity: 0 }],
        { duration: 360, easing: "ease-in", fill: "forwards" }
      );
    })() : null;
    const contentEffects = origin.content.map(({ element, bounds }) => {
      element.style.opacity = "0";
      placeTransitionClone(element, bounds, "10002");
      return {
        element,
        destinationY: element.classList.contains("back-row") ? 0 : window.innerHeight,
        duration: element.classList.contains("back-row") ? 200 : 360
      };
    });
    try {
      const backRowMotion = contentEffects
        .filter(({ element }) => element.classList.contains("back-row"))
        .map(({ element }) => element.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 200, easing: "ease-in", fill: "forwards" }
        ));
      const descriptionMotion = contentEffects
        .filter(({ element }) =>
          element.classList.contains("image-meta") || element.classList.contains("slide-description")
        )
        .map(({ element, destinationY, duration }) => element.animate(
          [{ transform: "translateY(0)", opacity: 1 }, { transform: `translateY(${destinationY}px)`, opacity: 0, filter: "blur(4px)" }],
          { duration, easing: "ease-in", fill: "forwards" }
        ));
      await Promise.all([
        carouselMotion?.finished,
        ...descriptionMotion.map(animation => animation.finished),
        ...backRowMotion.map(animation => animation.finished)
      ].filter(Boolean));
      if (origin.carousel) origin.carousel.element.remove();
      shell.style.removeProperty("clip-path");
      shellBackground?.remove();
      const contentMotion = contentEffects
        .filter(({ element }) =>
          !element.classList.contains("image-meta") &&
          !element.classList.contains("slide-description") &&
          !element.classList.contains("back-row")
        )
        .map(({ element, destinationY, duration }) => element.animate(
          [{ transform: "translateY(0)", opacity: 1 }, { transform: `translateY(${destinationY}px)`, opacity: 0, filter: "blur(4px)" }],
          { duration, easing: "ease-in", fill: "forwards" }
        ));
      const shellMotion = animateCellBounds(shell, origin.showcaseBounds, targetCellBounds, {
        selector: ".image-stage",
        from: origin.stageBounds,
        to: targetBounds,
        targetCell: target.cell,
        targetFrame: target.image,
        fitFrom: origin.fit,
        fitTo: window.getComputedStyle(target.image.querySelector("img") || target.image).objectFit
      });
      const galleryIntroMotion = playGalleryIntroEntrance(target.galleryIntro);
      const homeReturn = playHomeReturn(target.cell);
      await Promise.all([
        shellMotion.animation.finished,
        shellMotion.frameAnimation?.finished,
        shellMotion.imageAnimation?.finished,
        galleryIntroMotion?.finished,
        ...contentMotion.map(animation => animation.finished),
        ...homeReturn.map(animation => animation.finished)
      ].filter(Boolean));
      target.cell.style.opacity = "";
      target.image.style.opacity = "";
      target.cell.querySelectorAll(".cap, small").forEach(element => { element.style.opacity = "0"; });
      const heroReturn = playHeroReturn(target.cell);
      await shell.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-out", fill: "forwards" }).finished;
      shell.remove();
      await Promise.all([playCardTextEntrance(textEffects, target.cell), heroReturn].filter(Boolean));
    } finally {
      shell.style.removeProperty("clip-path");
      shell.remove();
      shellBackground?.remove();
      if (origin.carousel) origin.carousel.element.remove();
      target.cell.querySelectorAll(".cap, small").forEach(element => { element.style.opacity = ""; });
      target.image.style.opacity = "";
      target.cell.style.opacity = "";
      origin.content.forEach(({ element }) => element.remove());
      isTransitioning = false;
    }
  }

  function captureOrigin(card, thumbnail, kind, index) {
    const thumbnailImage = thumbnail.querySelector("img");
    const thumbnailFit = thumbnailImage ? window.getComputedStyle(thumbnailImage).objectFit : "cover";
    const liveCard = kind === "gallery-entry" && homeView.contains(card);
    const liveGalleryCard = kind === "gallery-home" && routeView.contains(card);
    const origin = {
      kind,
      index,
      cell: boundsOf(card),
      thumbnailBounds: boundsOf(thumbnail),
      card: liveCard || liveGalleryCard ? card : cloneWithComputedStyles(card, ".cap, small"),
      thumbnail: liveCard ? thumbnail : cloneWithComputedStyles(thumbnail),
      fit: thumbnailFit,
      scrollY: window.scrollY
    };
    if (liveCard) {
      origin.liveCard = {
        element: card,
        parent: card.parentNode,
        nextSibling: card.nextSibling,
        styles: captureLiveStyles(card),
        returnPlaceholder: cloneWithComputedStyles(card)
      };
    }
    if (homeView.contains(card)) {
      origin.homeEffects = [
        { element: homeView.querySelector(".hero"), motion: "up" },
        { element: homeView.querySelector("#work-h"), motion: "fade" },
        { element: homeView.querySelector("#gallery-collections-h"), motion: "fade" },
        ...[...homeView.querySelectorAll(".work .grid > a")].filter(item => item !== card).map(element => ({ element, motion: "scale" })),
        { element: homeView.querySelector(".about"), motion: "down" },
        { element: homeView.querySelector("#about-h"), motion: "fade" }
      ].filter(effect => effect.element).map(effect => ({
        motion: effect.motion,
        bounds: boundsOf(effect.element),
        element: cloneWithComputedStyles(effect.element)
      }));
      if (kind === "detail-entry" || kind === "gallery-entry") {
        origin.textParent = card;
        origin.textEffects = captureCardTextEntrance(card, thumbnail);
      }
    } else if (routeView.contains(card) && card.matches(".gallery-item")) {
      if (kind === "gallery-home") origin.liveThumbnailImage = thumbnail.querySelector("img");
      if (liveGalleryCard) origin.liveGalleryCard = { styles: captureLiveStyles(card) };
      const intro = routeView.querySelector(".gallery-intro");
      const backRow = routeView.querySelector(".back-row");
      if (backRow) {
        origin.galleryBackRow = {
          bounds: boundsOf(backRow),
          element: cloneWithComputedStyles(backRow),
          source: backRow
        };
      }
      if (kind === "gallery-home") {
        if (intro) origin.galleryHomeIntro = intro;
        origin.galleryExitCells = [...routeView.querySelectorAll(".gallery-item")]
          .filter(item => item !== card)
          .map(element => ({ element }));
      } else if (intro) origin.galleryIntro = { bounds: boundsOf(intro), element: cloneWithComputedStyles(intro) };
    }
    return origin;
  }

  async function playGalleryIntroExit(origin) {
    if (!origin?.galleryIntro || reducedMotion.matches) return;
    const { bounds, element } = origin.galleryIntro;
    Object.assign(element.style, {
      position: "fixed",
      left: `${bounds.x}px`,
      top: `${bounds.y}px`,
      width: `${bounds.width}px`,
      height: `${bounds.height}px`,
      margin: "0",
      zIndex: "10001",
      pointerEvents: "none"
    });
    document.body.append(element);
    try {
      await element.animate(
        [
          { transform: "translateY(0)", opacity: 1, filter: "blur(0)" },
          { transform: "translateY(-12vh)", opacity: 0, filter: "blur(4px)" }
        ],
        { duration: 360, easing: "ease-in", fill: "forwards" }
      ).finished;
    } finally {
      element.remove();
    }
  }

  function playGalleryIntroEntrance(intro) {
    if (!intro || reducedMotion.matches) return null;
    return intro.animate(
      [
        { transform: "translateY(-12vh)", opacity: 0, filter: "blur(4px)" },
        { transform: "translateY(0)", opacity: 1, filter: "blur(0)" }
      ],
      { duration: 360, easing: "ease-out" }
    );
  }

  async function playGalleryBackRowExit(origin) {
    const backRow = origin?.galleryBackRow;
    if (!backRow || reducedMotion.matches) return;
    const { bounds, element, source } = backRow;
    const sourceOpacity = source?.style.opacity || "";
    if (source) source.style.opacity = "0";
    placeTransitionClone(element, bounds, "10002");
    let completed = false;
    try {
      await element.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        easing: "ease-out",
        fill: "forwards"
      }).finished;
      completed = true;
    } finally {
      element.remove();
      if (!completed && source) source.style.opacity = sourceOpacity;
    }
  }

  async function playHomeExit(origin) {
    if (!origin?.homeEffects?.length) return;
    homeView.hidden = true;
    setScrollPosition(0);
    const animations = origin.homeEffects.map(effect => {
      const { element, bounds, motion } = effect;
      Object.assign(element.style, {
        position: "fixed",
        left: `${bounds.x}px`,
        top: `${bounds.y}px`,
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
        margin: "0",
        zIndex: "10001",
        pointerEvents: "none"
      });
      document.body.append(element);
      const frames = motion === "up"
        ? [{ transform: "translateY(0)", opacity: 1, filter: "blur(0)" }, { transform: "translateY(-12vh)", opacity: 0, filter: "blur(4px)" }]
        : motion === "down"
          ? [{ transform: "translateY(0)", opacity: 1, filter: "blur(0)" }, { transform: "translateY(100vh)", opacity: 0, filter: "blur(4px)" }]
          : motion === "scale"
            ? [{ transform: "scale(1)", opacity: 1, filter: "blur(0)" }, { transform: "scale(.55)", opacity: 0, filter: "blur(4px)" }]
            : [{ opacity: 1 }, { opacity: 0 }];
      return element.animate(frames, { duration: motion === "fade" ? 200 : 360, easing: motion === "fade" ? "ease-out" : "ease-in", fill: "forwards" });
    });
    try {
      await Promise.all(animations.map(animation => animation.finished));
    } finally {
      origin.homeEffects.forEach(({ element }) => element.remove());
    }
  }

  function playHomeReturn(targetCell) {
    if (!homeView.contains(targetCell)) return [];
    const animations = [];
    const animate = (element, frames, duration = 360, properties = ["opacity", "transform", "filter"]) => {
      if (!element) return;
      const animation = element.animate(frames, { duration, easing: "ease-out", fill: "both" });
      const clearStyles = () => {
        animation.cancel();
        properties.forEach(property => element.style.removeProperty(property));
      };
      animation.finished.then(clearStyles, clearStyles);
      animations.push(animation);
    };
    animate(homeView.querySelector(".about"), [
      { transform: "translateY(100vh)", opacity: 0, filter: "blur(4px)" },
      { transform: "translateY(0)", opacity: 1, filter: "blur(0)" }
    ]);
    [...homeView.querySelectorAll(".work .grid > a")]
      .filter(card => card !== targetCell)
      .forEach(card => animate(card, [
        { transform: "scale(.55)", opacity: 0, filter: "blur(4px)" },
        { transform: "scale(1)", opacity: 1, filter: "blur(0)" }
      ]));
    ["#work-h", "#about-h", "#gallery-collections-h"].forEach(selector => {
      const title = homeView.querySelector(selector);
      animate(title, [{ opacity: 0 }, { opacity: 1 }], 220, ["opacity"]);
    });
    return animations;
  }

  function prepareHomeReturn(targetCell) {
    [
      homeView.querySelector(".hero"),
      homeView.querySelector(".about"),
      ...homeView.querySelectorAll(".work .grid > a"),
      ...["#work-h", "#about-h", "#gallery-collections-h"].map(selector => homeView.querySelector(selector)),
      targetCell
    ].filter(Boolean).forEach(element => { element.style.opacity = "0"; });
  }

  function clearHomeReturnStyles() {
    [
      ...homeView.querySelectorAll(".hero, .about, .work .grid > a, #work-h, #about-h, #gallery-collections-h")
    ].forEach(element => {
      ["opacity", "transform", "filter"].forEach(property => element.style.removeProperty(property));
    });
  }

  function playHeroReturn(targetCell) {
    if (!homeView.contains(targetCell)) return null;
    const hero = homeView.querySelector(".hero");
    if (!hero) return null;
    const animation = hero.animate([
      { transform: "translateY(-12vh)", opacity: 0, filter: "blur(4px)" },
      { transform: "translateY(0)", opacity: 1, filter: "blur(0)" }
    ], { duration: 360, easing: "ease-out", fill: "both" });
    animation.finished.then(
      () => {
        animation.cancel();
        hero.style.removeProperty("opacity");
      },
      () => {
        animation.cancel();
        hero.style.removeProperty("opacity");
      }
    );
    return animation.finished;
  }

  function captureDetailOrigin() {
    const showcase = routeView.querySelector(".cell.showcase");
    const stage = routeView.querySelector(".image-stage");
    const imageMeta = routeView.querySelector(".image-meta");
    const description = routeView.querySelector(".image-overlay p");
    const backRow = routeView.querySelector(".back-row");
    const toolbar = routeView.querySelector(".carousel-toolbar");
    return {
      kind: "detail-return",
      showcaseBounds: boundsOf(showcase),
      stageBounds: boundsOf(stage),
      fit: window.getComputedStyle(stage.querySelector("img")).objectFit,
      scrollY: window.scrollY,
      shell: cloneWithComputedStyles(showcase, ".carousel-toolbar, .image-overlay, .image-stage span"),
      shellBackground: cloneWithComputedStyles(showcase, ".image-stage-shell, .carousel-toolbar, .image-overlay, .image-stage span"),
      carousel: toolbar && !toolbar.hidden ? { element: cloneWithComputedStyles(toolbar), bounds: boundsOf(toolbar) } : null,
      content: [imageMeta, description, backRow].map(element => ({
        element: cloneWithComputedStyles(element),
        bounds: boundsOf(element)
      }))
    };
  }

  async function playGalleryTransition(origin, target) {
    if (!origin || !target || reducedMotion.matches) return;
    if (!origin.liveCard) throw new Error("Gallery entry requires the live homepage work cell.");
    if (Number(target.cell.dataset.galleryIndex) !== (origin.galleryIndex ?? origin.index)) {
      throw new Error("Gallery transition target does not match the selected gallery cell.");
    }
    isTransitioning = true;
    target.cell.style.opacity = "0";
    target.image.style.opacity = "0";
    target.galleryIntro.style.opacity = "0";
    const motionAnimations = [];
    let cellMotion;
    try {
      applyLiveStyles(origin.liveCard.styles);
      await playCardTextExit(origin);
      routeView.style.removeProperty("opacity");
      placeTransitionClone(origin.card, origin.cell, "10003");
      Object.assign(origin.card.style, { transition: "none", filter: "none", opacity: "1" });
      const homeExit = playHomeExit(origin);
      const cycler = origin.card.querySelector(".gallery-cycler");
      retainActiveGallerySlide(cycler);
      cycler.querySelectorAll(".gallery-slide, .gallery-slide-image").forEach(element => {
        ["width", "height", "inline-size", "block-size"].forEach(property => {
          element.style.removeProperty(property);
        });
      });
      cellMotion = animateCellBounds(origin.card, origin.cell, boundsOf(target.cell), {
        selector: ".gallery-cycler",
        from: origin.thumbnailBounds,
        to: boundsOf(target.image),
        targetCell: target.cell,
        targetFrame: target.image,
        preserveAspectRatio: true,
        fitFrom: origin.fit,
        fitTo: window.getComputedStyle(target.image.querySelector("img") || target.image).objectFit
      });
      motionAnimations.push(cellMotion.animation, cellMotion.frameAnimation, cellMotion.imageAnimation);
      const galleryIntroMotion = (async () => {
        await homeExit;
        const animation = playGalleryIntroEntrance(target.galleryIntro);
        if (animation) await animation.finished;
        target.galleryIntro.style.removeProperty("opacity");
      })();
      await Promise.all([
        cellMotion.animation.finished,
        cellMotion.frameAnimation?.finished,
        cellMotion.imageAnimation?.finished
      ].filter(Boolean));
      motionAnimations.forEach(animation => animation?.cancel());
      const card = origin.card;
      const frame = card.querySelector(".gallery-cycler");
      const targetFrameAttributes = [...target.image.attributes]
        .filter(attribute => attribute.name !== "style")
        .map(attribute => [attribute.name, attribute.value]);
      const targetCardAttributes = [...target.cell.attributes]
        .filter(attribute => attribute.name !== "style")
        .map(attribute => [attribute.name, attribute.value]);
      const media = target.cell.firstElementChild;
      const targetFrameChildren = [...target.image.childNodes];
      if (!frame || !media) throw new Error("Could not complete the gallery cell handoff.");

      target.image.style.opacity = "";
      target.cell.style.opacity = "";
      const targetFrameStyle = target.image.getAttribute("style");
      const targetCardStyle = target.cell.getAttribute("style");
      target.image.replaceWith(frame);
      frame.replaceChildren(...targetFrameChildren);
      [...frame.attributes].forEach(attribute => frame.removeAttribute(attribute.name));
      targetFrameAttributes.forEach(([name, value]) => frame.setAttribute(name, value));
      card.replaceChildren(media);
      [...card.attributes].forEach(attribute => card.removeAttribute(attribute.name));
      targetCardAttributes.forEach(([name, value]) => card.setAttribute(name, value));
      restoreLiveStyles(origin.liveCard.styles);
      if (!targetFrameStyle) frame.removeAttribute("style");
      else frame.setAttribute("style", targetFrameStyle);
      if (!targetCardStyle) card.removeAttribute("style");
      else card.setAttribute("style", targetCardStyle);
      target.cell.replaceWith(card);
      origin.liveCard.inGallery = true;
      await Promise.all([galleryIntroMotion, homeExit]);
    } finally {
      motionAnimations.forEach(animation => animation?.cancel());
      if (!origin.liveCard.inGallery) {
        restoreLiveGalleryCard(origin.liveCard);
        homeView.hidden = false;
      }
      routeView.style.removeProperty("opacity");
      target.cell.style.opacity = "";
      target.image.style.opacity = "";
      target.galleryIntro.style.removeProperty("opacity");
      target.cell.querySelectorAll(".cap, small").forEach(element => { element.style.removeProperty("opacity"); });
      isTransitioning = false;
    }
  }

  async function playGalleryHomeReturn(origin, target) {
    if (!origin || !target || reducedMotion.matches) return;
    isTransitioning = true;
    const textEffects = captureCardTextEntrance(target.cell, target.image);
    const transitionCell = origin.card;
    const transitionFrame = transitionCell.querySelector(".image-slot");
    const transitionImage = transitionFrame?.querySelector("img");
    const entryLiveCard = galleryEntryOrigin?.liveCard;
    let targetImage;
    let galleryIntroExit;
    let galleryCellsExit;
    let galleryBackRowExit;
    let shellMotion;
    let entryHomeCardRestored = false;
    const restoreEntryHomeCard = () => {
      if (!entryLiveCard?.inGallery) return false;
      restoreLiveGalleryCard(entryLiveCard, origin.liveThumbnailImage, Number(origin.index));
      origin.liveThumbnailImage = null;
      origin.homePlaceholder?.remove();
      origin.homePlaceholder = null;
      entryHomeCardRestored = true;
      return true;
    };
    try {
      galleryBackRowExit = playGalleryBackRowExit(origin);
      transitionCell.style.removeProperty("opacity");
      transitionCell.querySelectorAll(".gallery-overlay").forEach(element => element.remove());
      if (origin.liveThumbnailImage && transitionImage !== origin.liveThumbnailImage) {
        throw new Error("The live gallery image is not attached to the returning work cell.");
      }
      transitionFrame?.style.removeProperty("filter");
      target.image.style.removeProperty("opacity");
      target.cell.querySelectorAll(".cap, small").forEach(element => { element.style.opacity = "0"; });
      [transitionFrame, transitionImage].filter(Boolean).forEach(element => {
        ["width", "height", "inline-size", "block-size"].forEach(property => {
          element.style.removeProperty(property);
        });
      });
      document.body.classList.add("is-gallery-home-returning");
      window.dispatchEvent(new Event("portfolio:gallery-home-return-start"));
      const activeSlideIndex = Number(origin.index);
      const targetSlides = Array.from(target.image.children);
      if (
        !Number.isInteger(activeSlideIndex) ||
        activeSlideIndex < 0 ||
        activeSlideIndex >= targetSlides.length
      ) throw new Error("Could not identify the selected homepage thumbnail for the gallery return.");

      target.image.dataset.slideIndex = String(activeSlideIndex);
      targetSlides.forEach((slide, index) => {
        slide.style.transform = index === activeSlideIndex ? "translateX(0)" : "translateX(100%)";
      });
      targetImage = targetSlides[activeSlideIndex].querySelector("img");
      if (origin.liveThumbnailImage && !targetImage) {
        throw new Error("Could not identify the homepage image for the gallery return.");
      }
      if (transitionCell.hasAttribute("data-gallery-pages")) {
        const pageBadge = transitionCell.querySelector(".gallery-media");
        if (pageBadge) {
          const badgeAnimations = ["::before", "::after"].map(pseudoElement =>
            pageBadge.animate(
              [{ opacity: 1 }, { opacity: 0 }],
              { duration: 180, easing: "ease-out", fill: "forwards", pseudoElement }
            )
          );
          await Promise.all(badgeAnimations.map(animation => animation.finished));
          transitionCell.classList.add("is-gallery-page-badge-hidden");
          badgeAnimations.forEach(animation => animation.cancel());
        }
      }
      galleryIntroExit = playGalleryHomeIntroExit(origin.galleryHomeIntro);
      galleryCellsExit = playGalleryCellsExit(origin);
      shellMotion = animateCellBounds(transitionCell, origin.cell, boundsOf(target.cell), {
        selector: ".image-slot",
        from: origin.thumbnailBounds,
        to: boundsOf(target.image),
        targetCell: target.cell,
        targetFrame: target.image,
        preserveAspectRatio: true,
        fitFrom: origin.fit,
        fitTo: targetImage ? window.getComputedStyle(targetImage).objectFit : "cover"
      });
      const cellTransform = Promise.all([
        shellMotion.animation.finished,
        shellMotion.frameAnimation?.finished,
        shellMotion.imageAnimation?.finished
      ].filter(Boolean));
      const homeReturn = playHomeReturn(target.cell);
      await Promise.all([
        cellTransform,
        galleryIntroExit,
        galleryCellsExit,
        galleryBackRowExit,
        ...homeReturn.map(animation => animation.finished)
      ].filter(Boolean));
      routeView.hidden = true;
      origin.galleryPlaceholder?.remove();
      origin.galleryPlaceholder = null;
      restoreGalleryHomeRouteStyle(origin);
      target.cell.querySelectorAll(".cap, small").forEach(element => { element.style.opacity = "0"; });
      [shellMotion.animation, shellMotion.frameAnimation, shellMotion.imageAnimation]
        .forEach(animation => animation?.cancel());
      if (!restoreEntryHomeCard()) {
        target.cell.style.opacity = "";
        handoffLiveGalleryImage(origin, targetImage);
      } else {
        entryLiveCard.element.querySelectorAll(".cap, small").forEach(element => { element.style.opacity = "0"; });
      }
      const finalHomeCell = entryHomeCardRestored ? entryLiveCard.element : target.cell;
      if (transitionCell !== finalHomeCell) transitionCell.remove();
      const heroReturn = playHeroReturn(finalHomeCell);
      await heroReturn;
      await playCardTextEntrance(textEffects, finalHomeCell);
    } finally {
      [shellMotion?.animation, shellMotion?.frameAnimation, shellMotion?.imageAnimation]
        .forEach(animation => animation?.cancel());
      if (!entryHomeCardRestored) restoreEntryHomeCard();
      if (!entryHomeCardRestored) {
        handoffLiveGalleryImage(
          origin,
          targetImage || target.image.children[Number(origin.index)]?.querySelector("img")
        );
      }
      const finalHomeCell = entryHomeCardRestored ? entryLiveCard.element : target.cell;
      if (transitionCell !== finalHomeCell) transitionCell.remove();
      origin.galleryPlaceholder?.remove();
      origin.galleryPlaceholder = null;
      origin.homePlaceholder?.remove();
      origin.thumbnail.remove();
      target.cell.style.opacity = "";
      target.image.style.removeProperty("opacity");
      finalHomeCell.querySelectorAll(".cap, small").forEach(element => { element.style.removeProperty("opacity"); });
      document.body.classList.remove("is-gallery-home-returning");
      routeView.hidden = true;
      restoreGalleryHomeRouteStyle(origin);
      galleryEntryOrigin = null;
      isTransitioning = false;
      window.dispatchEvent(new Event("portfolio:gallery-home-return-complete"));
    }
  }
  function getRoute() {
    const params = new URLSearchParams(window.location.search);
    const gallery = params.get("gallery");
    const collection = params.get("collection");
    const image = params.get("image");
    if (gallery && galleries[gallery]) return { type: "gallery", gallery };
    if (collection || image) return { type: "detail", collection: collection || "featured", image: image || "brand" };
    return { type: "home" };
  }

  function restoreGalleryHomeRouteStyle(transition) {
    if (transition?.galleryRouteStyle === undefined) return;
    if (transition.galleryRouteStyle === null) routeView.removeAttribute("style");
    else routeView.setAttribute("style", transition.galleryRouteStyle);
    transition.galleryRouteStyle = undefined;
  }

  function showHome(hash = "", transition) {
    const scrollToServices = () => {
      if (transition?.scrollToServices) {
        requestAnimationFrame(() => document.getElementById("services")?.scrollIntoView());
      }
    };
    const animatedGalleryReturn = transition?.kind === "gallery-home" && !reducedMotion.matches;
    if (animatedGalleryReturn) {
      const entryLiveCard = galleryEntryOrigin?.liveCard;
      const returnPlaceholder = entryLiveCard?.inGallery ? entryLiveCard.returnPlaceholder : null;
      if (entryLiveCard?.inGallery && !returnPlaceholder) {
        throw new Error("Could not preserve the homepage cell for the gallery return.");
      }
      document.body.classList.add("is-gallery-home-returning");
      if (!transition.liveGalleryCard) {
        throw new Error("Could not preserve the live gallery cell for the homepage return.");
      }
      const routeBounds = boundsOf(routeView);
      transition.galleryRouteStyle = routeView.getAttribute("style");
      Object.assign(routeView.style, {
        position: "fixed",
        left: `${routeBounds.x}px`,
        top: `${routeBounds.y}px`,
        width: `${routeBounds.width}px`,
        height: `${routeBounds.height}px`,
        boxSizing: "border-box",
        margin: "0",
        zIndex: "10000",
        pointerEvents: "none",
        transform: "none"
      });
      if (routeView.contains(transition.card)) {
        const placeholder = cloneWithComputedStyles(transition.card);
        placeholder.setAttribute("aria-hidden", "true");
        Object.assign(placeholder.style, { visibility: "hidden", pointerEvents: "none" });
        placeholder.querySelectorAll("*").forEach(element => { element.style.visibility = "hidden"; });
        transition.card.parentNode.insertBefore(placeholder, transition.card);
        transition.galleryPlaceholder = placeholder;
      }
      applyLiveStyles(transition.liveGalleryCard.styles);
      placeTransitionClone(transition.card, transition.cell, "10003");
      Object.assign(transition.card.style, { transition: "none", filter: "none", opacity: "1" });
      if (returnPlaceholder) {
        returnPlaceholder.style.pointerEvents = "none";
        entryLiveCard.parent.insertBefore(
          returnPlaceholder,
          entryLiveCard.nextSibling?.parentNode === entryLiveCard.parent ? entryLiveCard.nextSibling : null
        );
        transition.homePlaceholder = returnPlaceholder;
      }
    } else if (galleryEntryOrigin?.liveCard?.inGallery) {
      restoreLiveGalleryCard(galleryEntryOrigin.liveCard);
    }
    const animatedHomeReturn =
      transition?.kind === "detail-return" || transition?.kind === "gallery-home";
    let returnTargetCell = null;
    if (transition?.kind === "detail-return") {
      returnTargetCell = transition.target.type === "featured"
        ? homeView.querySelector(`[data-featured-work="${CSS.escape(transition.target.id)}"]`)
        : homeView.querySelector(`[data-gallery-link="${CSS.escape(transition.target.id)}"]`);
    } else if (transition?.kind === "gallery-home") {
      returnTargetCell = homeView.querySelector(`[data-gallery-link="${CSS.escape(transition.target.id)}"]`);
    }
    if (animatedHomeReturn && returnTargetCell && !reducedMotion.matches) {
      prepareHomeReturn(returnTargetCell);
    } else if (animatedHomeReturn) {
      clearHomeReturnStyles();
    } else {
      homeView.querySelector(".hero")?.style.removeProperty("opacity");
    }
    // Keep the gallery visible until its live exit elements finish animating.
    routeView.hidden = !animatedGalleryReturn;
    homeView.hidden = false;
    document.title = "Evan Biggers - Design Portfolio";
    const isHomeReturn = transition?.kind === "detail-return" || transition?.kind === "gallery-home";
    if (transition?.kind === "gallery-home") setScrollPosition(transition.scrollY || 0);
    else if (isHomeReturn) setScrollPosition(0);
    else if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    else setScrollPosition(transition?.scrollY || 0);
    if (transition?.kind === "detail-return") {
      requestAnimationFrame(() => {
        const image = returnTargetCell?.querySelector(transition.target.type === "featured" ? ".ph" : ".gallery-cycler");
        if (returnTargetCell && image) {
          playDetailReturn(transition, { cell: returnTargetCell, image }).finally(() => {
            clearHomeReturnStyles();
            scrollToServices();
          });
        } else {
          clearHomeReturnStyles();
          scrollToServices();
        }
      });
    } else if (transition?.kind === "gallery-home") {
      const image = returnTargetCell?.querySelector(".gallery-cycler");
      if (returnTargetCell && image) {
        playGalleryHomeReturn(transition, { cell: returnTargetCell, image }).finally(() => {
          clearHomeReturnStyles();
          scrollToServices();
        });
      } else {
        transition.galleryPlaceholder?.remove();
        routeView.hidden = true;
        restoreGalleryHomeRouteStyle(transition);
        clearHomeReturnStyles();
        scrollToServices();
      }
    }
  }

  function renderGallery(galleryId) {
    const gallery = galleries[galleryId];
    const transition = pendingTransition;
    pendingTransition = null;
    routeView.innerHTML = `
      <div class="gallery-heading-row">
        <div class="back-row"><a class="back-button" href="portfolio.html" aria-label="Back to home" title="Back to home"><svg class="back-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12c0-.55.3-1.05.8-1.34l12.6-7.5c2.18-1.3 4.77.52 4.36 3.03l-1.95 11.63c-.42 2.5-3.45 3.44-5.22 1.65L3.53 13.35A1.9 1.9 0 0 1 3 12Z"/></svg></a></div>
        <section class="grid section gallery-intro" aria-labelledby="gallery-title">
          <div class="cell"><h1 id="gallery-title">${escapeHtml(gallery.title)}</h1></div>
        </section>
      </div>
      <section class="section" aria-label="${escapeHtml(gallery.title)}">
        <div class="image-grid">
          ${gallery.labels.map((label, index) => {
            const image = String(index + 1).padStart(2, "0");
            const itemData = gallery.items?.[index];
            const itemTitle = itemData?.title || (galleryId === "general" ? label : `${gallery.title.replace(/ Collection$/, "")} image ${image}`);
            const itemLabel = itemData?.subtitle || "Photoshop";
            const pageImages = itemData?.images || [];
            const pageAttribute = pageImages.length > 1 ? ` data-gallery-pages="${escapeHtml(pageImages.join("|"))}"` : "";
            const imageFitAttribute = itemData?.imageFit ? ` data-image-fit="${escapeHtml(itemData.imageFit)}"` : "";
            const videoAttribute = itemData?.video ? ` data-gallery-video="${escapeHtml(itemData.video)}"` : "";
            const thumbnail = itemData?.video
              ? `<img data-video-thumbnail="${escapeHtml(itemData.video)}" alt="">`
              : pageImages.length
              ? `<img src="${escapeHtml(pageImages[0])}" alt="">`
              : "<span>image placeholder</span>";
            const destination = portfolioUrl();
            destination.searchParams.set("collection", galleryId);
            destination.searchParams.set("image", image);
            return `<a class="gallery-item" data-gallery-index="${index}"${pageAttribute}${imageFitAttribute}${videoAttribute} href="${escapeHtml(destination.href)}" aria-label="Open ${escapeHtml(itemTitle)}: ${escapeHtml(itemLabel)}"><div class="gallery-media" style="--tile-ratio:${gallery.ratios[index]}"><div class="image-slot" role="img" aria-label="${escapeHtml(itemLabel)}">${thumbnail}</div><div class="gallery-overlay"><strong>${escapeHtml(itemTitle)}</strong><small>${escapeHtml(itemLabel)}</small></div></div></a>`;
          }).join("")}
        </div>
      </section>`;
    routeView.querySelectorAll("[data-video-thumbnail]").forEach(image => {
      const videoSource = image.dataset.videoThumbnail;
      window.getGalleryVideoThumbnail(videoSource).then(thumbnail => {
        image.src = thumbnail;
      }).catch(error => {
        console.error(error);
        const placeholder = document.createElement("span");
        placeholder.textContent = "Video preview unavailable.";
        image.replaceWith(placeholder);
      });
    });
    window.fitGalleryCellImages(routeView);
    const waitForCardText = transition?.kind === "gallery-entry" && !reducedMotion.matches;
    routeView.style.opacity = waitForCardText ? "0" : "";
    routeView.hidden = false;
    homeView.hidden = !waitForCardText;
    document.title = `${gallery.title} | Evan Biggers`;
    if (
      transition?.kind !== "gallery-entry" ||
      !transition.homeEffects?.length ||
      reducedMotion.matches
    ) setScrollPosition(0);
    if (transition?.kind === "gallery-entry" || transition?.kind === "gallery-return") {
      requestAnimationFrame(() => {
        const index = transition.galleryIndex ?? transition.index;
        if (!Number.isInteger(index) || index < 0 || index >= gallery.labels.length) {
          throw new Error(`Invalid gallery transition index "${index}" for "${galleryId}".`);
        }
        const item = routeView.querySelector(`[data-gallery-index="${index}"]`);
        const image = item?.querySelector(".image-slot");
        const intro = routeView.querySelector(".gallery-intro");
        if (!item || !image) return;
        const target = { cell: item, image, galleryIntro: intro };
        if (transition.kind === "gallery-return") playDetailReturn(transition, target);
        else playGalleryTransition(transition, target);
      });
    } else if (!reducedMotion.matches) {
      requestAnimationFrame(() => playGalleryIntroEntrance(routeView.querySelector(".gallery-intro")));
    }
  }

  function renderDetail(route, routeToken) {
    const transition = pendingTransition;
    pendingTransition = null;
    const isFeatured = route.collection === "featured";
    const gallery = galleries[route.collection];
    const galleryItemIndex = Number.parseInt(route.image, 10) - 1;
    const galleryItem = gallery?.items?.[galleryItemIndex];
    const project = isFeatured && projects[route.image]
      ? projects[route.image]
      : galleryItem
        ? {
            title: galleryItem.title,
            description: galleryItem.description || `${galleryItem.title} project.`,
            slides: galleryItem.video
              ? [{
                  video: galleryItem.video,
                  subtitle: galleryItem.label,
                  description: galleryItem.description
                }]
              : galleryItem.images.map((image, index) => ({
                  image,
                  subtitle: `Page ${index + 1}`,
                  description: `${galleryItem.title} project.`
                }))
          }
      : {
          title: gallery
            ? `${gallery.title === "Image collection" ? "Image" : `${gallery.title.replace(/ Collection$/, "")} image`} ${escapeHtml(route.image)}`
            : `Selected image ${escapeHtml(route.image)}`,
          description: collectionDetails[route.collection] || "Selected project image.",
          slides: [{ subtitle: "Image view", description: collectionDetails[route.collection] || "Selected project image." }]
        };
    const slides = project.slides;
    const backUrl = portfolioUrl();
    if (gallery) backUrl.searchParams.set("gallery", route.collection);
    const firstSlide = slides[0];
    const slideSource = firstSlide.image ? `src="${escapeHtml(firstSlide.image)}"` : "";
    const thumbnailCycleCount = slides.length > 1 ? 5 : 1;
    const centerThumbnailCycle = Math.floor(thumbnailCycleCount / 2);
    const thumbnailEntries = Array.from({ length: thumbnailCycleCount }, (_, cycleIndex) =>
      slides.map((_, index) => ({
        index,
        cycleIndex,
        sequenceIndex: cycleIndex * slides.length + index
      }))
    ).flat();
    const thumbnailMarkup = thumbnailEntries.map(({ index, cycleIndex, sequenceIndex }) => {
      const slide = slides[index];
      const distance = Math.min(index, slides.length - index);
      const scale = Math.max(.82, 1 - distance * .025);
      const thumbnailImage = slide.image
        ? `<img src="${escapeHtml(slide.image)}" alt="">`
        : slide.video
          ? `<img data-video-thumbnail="${escapeHtml(slide.video)}" alt="">`
          : "";
      return `<button class="thumbnail" type="button" data-slide-index="${index}" data-cycle-index="${cycleIndex}" data-sequence-index="${sequenceIndex}" aria-label="Show ${escapeHtml(slide.subtitle)}" aria-pressed="${cycleIndex === centerThumbnailCycle && index === 0}" style="--thumbnail-scale:${scale}">
        <span class="thumbnail-preview" data-view="${index % 3}" aria-hidden="true">${thumbnailImage}</span>
      </button>`;
    }).join("");

    const staging = document.createElement("div");
    staging.innerHTML = `
      <div class="back-row"><a class="back-button" href="${escapeHtml(backUrl.href)}" aria-label="Back" title="Back"><svg class="back-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12c0-.55.3-1.05.8-1.34l12.6-7.5c2.18-1.3 4.77.52 4.36 3.03l-1.95 11.63c-.42 2.5-3.45 3.44-5.22 1.65L3.53 13.35A1.9 1.9 0 0 1 3 12Z"/></svg></a></div>
      <section class="section image-detail-section" aria-label="Image showcase">
        <div class="cell showcase">
          <div class="image-stage-shell" tabindex="0" role="group" aria-label="Image preview">
            <div class="image-stage" role="group" aria-label="${escapeHtml(project.title)}: ${escapeHtml(firstSlide.subtitle)}">
              <span aria-hidden="true" ${firstSlide.image || firstSlide.video || firstSlide.youtube ? "hidden" : ""}>large image</span>
              <img class="stage-image" alt="" ${slideSource} ${firstSlide.image ? "" : "hidden"}>
              <video class="stage-video" preload="metadata" playsinline hidden></video>
              <iframe class="stage-embed" title="${escapeHtml(firstSlide.subtitle)}" allow="autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen hidden></iframe>
              <div class="video-player" hidden>
                <button class="video-play-button" type="button" aria-label="Play video">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.8c0-1.1 1.2-1.8 2.2-1.2l11 6.7a2 2 0 0 1 0 3.4l-11 6.7A1.5 1.5 0 0 1 7 19.2Z"/></svg>
                </button>
                <div class="video-control-bar">
                  <button class="video-pause-button" type="button" aria-label="Pause video">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
                  </button>
                  <input class="video-timeline" type="range" min="0" max="1" step="0.1" value="0" aria-label="Scrub video timeline">
                </div>
                <span class="video-error" role="status" hidden></span>
              </div>
            </div>
            <div class="image-overlay" aria-live="polite">
              <p class="slide-description" ${project.showSlideDescription === false ? "hidden" : ""}>${escapeHtml(firstSlide.description)}</p>
              <span class="image-index"></span>
            </div>
          </div>
          <div class="carousel-toolbar" ${slides.length > 1 ? "" : "hidden"}>
            <button class="carousel-control carousel-previous" type="button" aria-label="Previous image"><svg class="back-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12c0-.55.3-1.05.8-1.34l12.6-7.5c2.18-1.3 4.77.52 4.36 3.03l-1.95 11.63c-.42 2.5-3.45 3.44-5.22 1.65L3.53 13.35A1.9 1.9 0 0 1 3 12Z"/></svg></button>
            <div class="thumbnail-section" role="group" aria-label="Carousel image previews">
              <div class="thumbnail-list">${thumbnailMarkup}</div>
            </div>
            <button class="carousel-control carousel-next" type="button" aria-label="Next image"><svg class="back-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12c0-.55.3-1.05.8-1.34l12.6-7.5c2.18-1.3 4.77.52 4.36 3.03l-1.95 11.63c-.42 2.5-3.45 3.44-5.22 1.65L3.53 13.35A1.9 1.9 0 0 1 3 12Z"/></svg></button>
          </div>
        </div>
        <div class="cell image-meta">
          <div class="image-meta-heading">
            <h1>${escapeHtml(project.title)}</h1>
            ${project.subtitle ? `<p class="image-meta-subtitle">${escapeHtml(project.subtitle)}</p>` : ""}
          </div>
          <p class="image-description">${escapeHtml(project.description)}</p>
        </div>
      </section>`;

    const stage = staging.querySelector(".image-stage");
    const stageImage = staging.querySelector(".stage-image");
    stageImage.draggable = false;
    const stageVideo = staging.querySelector(".stage-video");
    const stageEmbed = staging.querySelector(".stage-embed");
    const videoPlayer = staging.querySelector(".video-player");
    const videoPlayButton = staging.querySelector(".video-play-button");
    const videoPauseButton = staging.querySelector(".video-pause-button");
    const videoTimeline = staging.querySelector(".video-timeline");
    const videoError = staging.querySelector(".video-error");
    const stagePlaceholder = staging.querySelector(".image-stage > span");
    const indexLabel = staging.querySelector(".image-index");
    const slideDescription = staging.querySelector(".slide-description");
    const thumbnailList = staging.querySelector(".thumbnail-list");
    const thumbnails = [...staging.querySelectorAll(".thumbnail")];
    let activeSlide = 0;
    let activeSequenceIndex = centerThumbnailCycle * slides.length;
    let slideToken = 0;
    let thumbnailScrollFrame = 0;
    const centerThumbnail = (sequenceIndex, behavior = "smooth", onComplete = () => {}) => {
      const thumbnail = thumbnails[sequenceIndex];
      if (!thumbnail) return;
      const listBounds = thumbnailList.getBoundingClientRect();
      const thumbnailBounds = thumbnail.getBoundingClientRect();
      const targetLeft = thumbnailList.scrollLeft + thumbnailBounds.left - listBounds.left +
        thumbnailBounds.width / 2 - thumbnailList.clientWidth / 2;
      const endLeft = Math.min(Math.max(targetLeft, 0), thumbnailList.scrollWidth - thumbnailList.clientWidth);
      if (thumbnailScrollFrame) window.cancelAnimationFrame(thumbnailScrollFrame);
      const startLeft = thumbnailList.scrollLeft;
      if (reducedMotion.matches || behavior === "auto" || startLeft === endLeft) {
        thumbnailList.scrollLeft = endLeft;
        thumbnailScrollFrame = 0;
        onComplete();
        return;
      }
      const startedAt = performance.now();
      const animateScroll = now => {
        const progress = Math.min((now - startedAt) / 380, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        thumbnailList.scrollLeft = startLeft + (endLeft - startLeft) * easedProgress;
        if (progress < 1) thumbnailScrollFrame = window.requestAnimationFrame(animateScroll);
        else {
          thumbnailScrollFrame = 0;
          onComplete();
        }
      };
      thumbnailScrollFrame = window.requestAnimationFrame(animateScroll);
    };
    const keepThumbnailCycleContinuous = () => {
      if (thumbnailScrollFrame || slides.length < 2) return;
      const cycleWidth = thumbnails[slides.length]?.offsetLeft - thumbnails[0]?.offsetLeft;
      const maxScroll = thumbnailList.scrollWidth - thumbnailList.clientWidth;
      if (!cycleWidth || maxScroll <= 0) return;
      const shift = cycleWidth * 2;
      if (thumbnailList.scrollLeft < cycleWidth && thumbnailList.scrollLeft + shift <= maxScroll) {
        thumbnailList.scrollLeft += shift;
      } else if (thumbnailList.scrollLeft > maxScroll - cycleWidth && thumbnailList.scrollLeft - shift >= 0) {
        thumbnailList.scrollLeft -= shift;
      }
    };
    thumbnailList.addEventListener("scroll", keepThumbnailCycleContinuous);

    const loadImage = image => new Promise((resolve, reject) => {
      if (image.complete) {
        if (image.naturalWidth > 0) resolve();
        else reject(new Error(`Could not load image: ${image.src}`));
        return;
      }
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", () => reject(new Error(`Could not load image: ${image.src}`)), { once: true });
    });

    const updateVideoTimeline = () => {
      if (Number.isFinite(stageVideo.duration)) videoTimeline.max = String(stageVideo.duration);
      videoTimeline.value = String(Number.isFinite(stageVideo.currentTime) ? stageVideo.currentTime : 0);
    };
    const playVideo = () => {
      videoError.hidden = true;
      stageVideo.play().then(() => videoPauseButton.focus()).catch(error => {
        if (error.name !== "AbortError") {
          console.error(error);
          videoError.textContent = "Unable to play this video.";
          videoError.hidden = false;
        }
      });
    };
    videoPlayButton.addEventListener("click", () => {
      const activeMedia = slides[activeSlide];
      if (activeMedia.youtube) {
        const embedUrl = new URL(activeMedia.youtube);
        embedUrl.searchParams.set("autoplay", "1");
        stageEmbed.src = embedUrl.href;
        stageEmbed.hidden = false;
        stageImage.hidden = true;
        videoPlayer.classList.add("is-playing", "is-embedded");
      } else if (stageVideo.paused) playVideo();
      else stageVideo.pause();
    });
    videoPauseButton.addEventListener("click", () => {
      stageVideo.pause();
      videoPlayButton.focus();
    });
    videoTimeline.addEventListener("input", () => {
      if (Number.isFinite(stageVideo.duration)) stageVideo.currentTime = Number(videoTimeline.value);
    });
    stageVideo.addEventListener("loadedmetadata", updateVideoTimeline);
    stageVideo.addEventListener("timeupdate", updateVideoTimeline);
    stageVideo.addEventListener("play", () => videoPlayer.classList.add("is-playing"));
    stageVideo.addEventListener("pause", () => videoPlayer.classList.remove("is-playing"));
    stageVideo.addEventListener("error", () => {
      videoError.textContent = "Unable to load this video.";
      videoError.hidden = false;
    });
    if (firstSlide.video) {
      stageVideo.src = firstSlide.video;
      stageVideo.hidden = false;
      videoPlayer.hidden = false;
      stagePlaceholder.hidden = true;
    } else if (firstSlide.youtube) {
      videoPlayer.hidden = false;
      stagePlaceholder.hidden = true;
    }
    staging.querySelectorAll("[data-video-thumbnail]").forEach(image => {
      const videoSource = image.dataset.videoThumbnail;
      window.getGalleryVideoThumbnail(videoSource).then(thumbnail => {
        image.src = thumbnail;
        if (firstSlide.video === videoSource) stageVideo.poster = thumbnail;
      }).catch(error => {
        console.error(error);
      });
    });

    const setSlide = async (index, requestedSequenceIndex) => {
      const currentToken = ++slideToken;
      const nextIndex = (index + slides.length) % slides.length;
      const direction = Math.sign(index - activeSlide);
      const nextSequenceIndex = slides.length > 1
        ? Number.isInteger(requestedSequenceIndex)
          ? requestedSequenceIndex
          : activeSequenceIndex + direction
        : 0;
      const slide = slides[nextIndex];
      if ((slides[activeSlide]?.video || slides[activeSlide]?.youtube) && activeSlide !== nextIndex) {
        stageVideo.pause();
        stageVideo.currentTime = 0;
      }
      if (slide.image && stageImage.src !== new URL(slide.image, window.location.href).href) {
        const preloadedImage = new Image();
        preloadedImage.src = slide.image;
        try {
          await loadImage(preloadedImage);
        } catch (error) {
          console.error(error);
          stagePlaceholder.textContent = "Image could not be loaded.";
          stagePlaceholder.hidden = false;
          return;
        }
        if (currentToken !== slideToken) return;
        stageImage.src = slide.image;
      }
      if (currentToken !== slideToken) return;
      activeSlide = nextIndex;
      activeSequenceIndex = nextSequenceIndex;
      const hasVideo = Boolean(slide.video || slide.youtube);
      stage.classList.toggle("is-video", hasVideo);
      stageImage.hidden = !slide.image || Boolean(slide.video);
      stagePlaceholder.hidden = Boolean(slide.image);
      if (slide.video) {
        stageEmbed.removeAttribute("src");
        stageEmbed.hidden = true;
        videoPlayer.classList.remove("is-embedded");
        stageVideo.poster = slide.image || "";
        if (stageVideo.getAttribute("src") !== slide.video) {
          stageVideo.src = slide.video;
          stageVideo.load();
        }
        stageVideo.hidden = false;
        videoPlayer.hidden = false;
        videoError.hidden = true;
        videoTimeline.value = "0";
      } else if (slide.youtube) {
        stageVideo.pause();
        stageVideo.removeAttribute("src");
        stageVideo.removeAttribute("poster");
        stageVideo.load();
        stageVideo.hidden = true;
        stageEmbed.removeAttribute("src");
        stageEmbed.hidden = true;
        videoPlayer.hidden = false;
        videoPlayer.classList.remove("is-playing", "is-embedded");
        videoError.hidden = true;
      } else {
        stageVideo.pause();
        stageVideo.removeAttribute("src");
        stageVideo.removeAttribute("poster");
        stageVideo.load();
        stageEmbed.removeAttribute("src");
        stageEmbed.hidden = true;
        stageVideo.hidden = true;
        videoPlayer.hidden = true;
        videoPlayer.classList.remove("is-playing", "is-embedded");
      }
      stage.setAttribute("aria-label", `${project.title}: ${slide.subtitle}`);
      indexLabel.textContent = `${String(nextIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
      slideDescription.textContent = slide.description;
      thumbnails.forEach((thumbnail, sequenceIndex) => {
        const thumbnailIndex = Number(thumbnail.dataset.slideIndex);
        thumbnail.setAttribute("aria-pressed", String(sequenceIndex === nextSequenceIndex));
        const distance = Math.min(
          Math.abs(thumbnailIndex - nextIndex),
          slides.length - Math.abs(thumbnailIndex - nextIndex)
        );
        thumbnail.style.setProperty("--thumbnail-scale", String(Math.max(.82, 1 - distance * .025)));
      });
      const needsRebase = Number(thumbnails[nextSequenceIndex]?.dataset.cycleIndex) !== centerThumbnailCycle;
      centerThumbnail(nextSequenceIndex, "smooth", () => {
        if (!needsRebase || !routeView.contains(stage)) return;
        activeSequenceIndex = centerThumbnailCycle * slides.length + nextIndex;
        thumbnails.forEach((thumbnail, sequenceIndex) => {
          thumbnail.setAttribute("aria-pressed", String(sequenceIndex === activeSequenceIndex));
        });
        centerThumbnail(activeSequenceIndex, "auto");
      });
    };

    thumbnails.forEach(thumbnail => thumbnail.addEventListener("click", () => setSlide(
      Number(thumbnail.dataset.slideIndex),
      Number(thumbnail.dataset.sequenceIndex)
    )));
    staging.querySelector(".carousel-previous")?.addEventListener("click", () => setSlide(activeSlide - 1));
    staging.querySelector(".carousel-next")?.addEventListener("click", () => setSlide(activeSlide + 1));
    const handleArrowKeys = event => {
      if (!routeView.contains(stage) || !routeView.contains(document.activeElement)) return;
      if (event.key === "ArrowLeft") setSlide(activeSlide - 1);
      if (event.key === "ArrowRight") setSlide(activeSlide + 1);
    };
    activeArrowHandler = handleArrowKeys;
    document.addEventListener("keydown", handleArrowKeys);

    const firstImageLoad = firstSlide.image ? loadImage(stageImage).catch(error => {
      console.error(error);
      stagePlaceholder.textContent = "Image could not be loaded.";
      stagePlaceholder.hidden = false;
      stageImage.hidden = true;
    }) : Promise.resolve();
    firstImageLoad.then(() => {
      if (routeToken !== activeRouteToken) return;
      indexLabel.textContent = `01 / ${String(slides.length).padStart(2, "0")}`;
      routeView.replaceChildren(...staging.childNodes);
      routeView.hidden = false;
      centerThumbnail(activeSequenceIndex, "auto");
      const waitForCardText = transition?.kind === "detail-entry" && !reducedMotion.matches;
      routeView.style.opacity = waitForCardText ? "0" : "";
      homeView.hidden = !waitForCardText;
      if (waitForCardText) {
        routeView.querySelector(".cell.showcase").style.opacity = "0";
        routeView.querySelector(".image-meta").style.opacity = "0";
        routeView.querySelector(".image-overlay p").style.opacity = "0";
        const toolbar = routeView.querySelector(".carousel-toolbar");
        if (!toolbar.hidden) toolbar.style.visibility = "hidden";
      }
      document.title = `${project.title} | Evan Biggers`;
      if (
        transition?.kind !== "detail-entry" ||
        !transition.homeEffects?.length ||
        reducedMotion.matches
      ) setScrollPosition(0);
      if (transition?.kind === "detail-entry") playDetailEntrance(transition);
    });
  }

  let activeRouteToken = 0;

  function renderRoute() {
    const routeToken = ++activeRouteToken;
    routeView.querySelector(".stage-video")?.pause();
    routeView.querySelector(".stage-embed")?.removeAttribute("src");
    if (activeArrowHandler) {
      document.removeEventListener("keydown", activeArrowHandler);
      activeArrowHandler = null;
    }
    const route = getRoute();
    document.body.classList.toggle("is-showcase-route", route.type !== "home");
    window.dispatchEvent(new CustomEvent("portfolio:routechange", { detail: { type: route.type } }));
    const transition = pendingTransition;
    pendingTransition = null;
    if (route.type === "home") {
      showHome(window.location.hash, transition);
      return;
    }
    if (route.type === "gallery") {
      pendingTransition = transition;
      renderGallery(route.gallery);
      return;
    }
    pendingTransition = transition;
    renderDetail(route, routeToken);
  }

  function navigate(url, transition) {
    const currentRoute = getRoute();
    window.history.pushState({}, "", url);
    const nextRoute = getRoute();
    let nextTransition = transition || null;
    if (currentRoute.type === "home" && nextRoute.type === "gallery" && (nextTransition?.kind !== "gallery-entry" || !nextTransition.liveCard)) {
      const card = homeView.querySelector(`[data-gallery-link="${CSS.escape(nextRoute.gallery)}"]`);
      const thumbnail = card?.querySelector(".gallery-cycler");
      nextTransition = card && thumbnail
        ? captureOrigin(card, thumbnail, "gallery-entry", getGallerySlideIndex(thumbnail, nextRoute.gallery))
        : null;
      if (nextTransition) {
        nextTransition.galleryIndex = nextTransition.index;
        nextTransition.target = { type: "gallery", id: nextRoute.gallery };
      }
    }
    pendingTransition = nextTransition;
    if (nextRoute.type === "detail") detailEntryOrigin = nextTransition;
    if (nextRoute.type === "gallery" && nextTransition?.liveCard) galleryEntryOrigin = nextTransition;
    previousRoute = nextRoute;
    renderRoute();
  }

  function getGalleryFromPath(pathname) {
    const filename = pathname.split("/").pop().toLowerCase();
    if (filename === "gallery.html") return "general";
    const match = filename.match(/^gallery-(website|packaging|editorial|videography)\.html$/);
    return match?.[1] || null;
  }

  window.addEventListener("click", event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!link || link.target || link.hasAttribute("download")) return;
    if (isTransitioning) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;

    const currentRoute = getRoute();
    const routeUrl = portfolioUrl();
    const linkCard = link.closest("[data-featured-work], [data-gallery-link], .gallery-item");
    const captureCardOrigin = (card, thumbnail, kind, index) =>
      card && thumbnail ? captureOrigin(card, thumbnail, kind, index) : null;

    const gallery = getGalleryFromPath(destination.pathname);
    const filename = destination.pathname.split("/").pop().toLowerCase();
    if (
      (currentRoute.type === "gallery" || currentRoute.type === "detail") &&
      (link.getAttribute("href") === "#services" || destination.hash === "#services")
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const homeUrl = portfolioUrl();
      homeUrl.hash = "#services";
      let origin = null;
      if (currentRoute.type === "detail") {
        origin = captureDetailOrigin();
        origin.target = currentRoute.collection === "featured"
          ? { type: "featured", id: currentRoute.image }
          : { type: "gallery", id: currentRoute.collection };
        origin.scrollToServices = true;
      } else {
        const selectedIndex = galleryEntryOrigin?.target?.id === currentRoute.gallery &&
          Number.isInteger(galleryEntryOrigin.galleryIndex ?? galleryEntryOrigin.index)
          ? galleryEntryOrigin.galleryIndex ?? galleryEntryOrigin.index
          : 0;
        const selectedItem = routeView.querySelectorAll(".gallery-item")[selectedIndex];
        const image = selectedItem?.querySelector(".image-slot");
        origin = selectedItem && image
          ? captureCardOrigin(selectedItem, image, "gallery-home", selectedIndex)
          : null;
        if (origin) {
          origin.target = { id: currentRoute.gallery };
          origin.scrollY = galleryEntryOrigin?.scrollY || 0;
          origin.scrollToServices = true;
        }
      }
      navigate(homeUrl.href, origin || { scrollToServices: true });
      return;
    }
    if (currentRoute.type === "gallery" && linkCard?.matches(".gallery-item")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (typeof window.openGalleryImageLightbox !== "function") {
        throw new Error("The gallery image lightbox is unavailable.");
      }
      window.openGalleryImageLightbox(linkCard);
      return;
    }
    if (filename === "image-detail.html") {
      event.preventDefault();
      event.stopImmediatePropagation();
      const params = new URLSearchParams(destination.search);
      routeUrl.search = params.toString();
      const card = linkCard?.matches("[data-featured-work]") ? linkCard : null;
      const origin = captureCardOrigin(card, card?.querySelector(".ph"), "detail-entry");
      navigate(routeUrl.href, origin);
      return;
    }
    if (gallery) {
      event.preventDefault();
      event.stopImmediatePropagation();
      routeUrl.searchParams.set("gallery", gallery);
      const card = linkCard?.matches("[data-gallery-link]") ? linkCard : null;
      const cycler = card?.querySelector(".gallery-cycler");
      if (cycler?.dataset.animating === "true") return;
      const index = cycler ? getGallerySlideIndex(cycler, gallery) : 0;
      const origin = captureCardOrigin(card, cycler, "gallery-entry", index);
      if (origin) {
        origin.galleryIndex = index;
        origin.target = { type: "gallery", id: gallery };
      }
      navigate(routeUrl.href, origin);
      return;
    }

    const currentFilename = window.location.pathname.split("/").pop().toLowerCase();
    const hashHref = link.getAttribute("href");
    const directRouteParams = new URLSearchParams(destination.search);
    if (
      !link.matches("#route-view .back-button") &&
      (directRouteParams.has("collection") || directRouteParams.has("image") || directRouteParams.has("gallery"))
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      let origin = null;
      if (linkCard?.matches("[data-featured-work]")) {
        origin = captureCardOrigin(linkCard, linkCard.querySelector(".ph"), "detail-entry");
      } else if (linkCard?.matches(".gallery-item")) {
        const index = [...routeView.querySelectorAll(".gallery-item")].indexOf(linkCard);
        origin = captureCardOrigin(linkCard, linkCard.querySelector(".image-slot"), "detail-entry", index);
      }
      navigate(destination.href, origin);
      return;
    }

    if (link.matches("#route-view .back-button")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const currentItem = routeView.querySelector(".gallery-item");
      if (currentRoute.type === "detail") {
        const origin = captureDetailOrigin();
        const targetParams = new URLSearchParams(destination.search);
        const targetGallery = targetParams.get("gallery");
        if (targetGallery) {
          origin.kind = "gallery-return";
          origin.index = 0;
        } else {
          origin.target = { type: "featured", id: currentRoute.image };
          origin.scrollY = detailEntryOrigin?.scrollY || 0;
        }
        navigate(destination.href, origin);
      } else if (currentRoute.type === "gallery" && currentItem) {
        const selectedIndex = galleryEntryOrigin?.target?.id === currentRoute.gallery &&
          Number.isInteger(galleryEntryOrigin.galleryIndex ?? galleryEntryOrigin.index)
          ? galleryEntryOrigin.galleryIndex ?? galleryEntryOrigin.index
          : 0;
        const selectedItem = routeView.querySelectorAll(".gallery-item")[selectedIndex];
        const image = selectedItem?.querySelector(".image-slot");
        const origin = selectedItem && image
          ? captureCardOrigin(selectedItem, image, "gallery-home", selectedIndex)
          : null;
        if (origin) {
          origin.target = { id: currentRoute.gallery };
          origin.scrollY = galleryEntryOrigin?.scrollY || 0;
        }
        navigate(destination.href, origin);
      } else {
        navigate(destination.href);
      }
      return;
    }

    if (currentFilename === "portfolio.html" && hashHref?.startsWith("#")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      routeUrl.hash = hashHref;
      navigate(routeUrl.href);
      return;
    }
    if (filename !== "portfolio.html" && destination.pathname !== window.location.pathname) return;
    if (filename === "portfolio.html" || currentFilename === "portfolio.html") {
      const params = new URLSearchParams(destination.search);
      if (params.has("gallery") || params.has("collection") || params.has("image")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        navigate(destination.href);
        return;
      }
      if (destination.hash || link.getAttribute("href")?.startsWith("#")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        routeUrl.hash = destination.hash || link.getAttribute("href");
        navigate(routeUrl.href);
      }
    }
  }, true);

  window.addEventListener("popstate", () => {
    const nextRoute = getRoute();
    let transition = null;
    if (previousRoute?.type === "detail") {
      transition = captureDetailOrigin();
      if (nextRoute.type === "gallery") {
        transition.kind = "gallery-return";
        transition.index = detailEntryOrigin?.index || 0;
      } else if (nextRoute.type === "home") {
        transition.target = { type: "featured", id: previousRoute.image };
        transition.scrollY = detailEntryOrigin?.scrollY || 0;
      }
    } else if (previousRoute?.type === "gallery") {
      if (nextRoute.type === "home") {
        const index = galleryEntryOrigin?.galleryIndex ?? galleryEntryOrigin?.index ?? 0;
        const item = routeView.querySelectorAll(".gallery-item")[index];
        const image = item?.querySelector(".image-slot");
        if (item && image) {
          transition = captureOrigin(item, image, "gallery-home", index);
          transition.target = { id: previousRoute.gallery };
          transition.scrollY = galleryEntryOrigin?.scrollY || 0;
        }
      } else if (nextRoute.type === "detail") {
        const index = Math.max(0, Number.parseInt(nextRoute.image, 10) - 1 || 0);
        const item = routeView.querySelectorAll(".gallery-item")[index];
        const image = item?.querySelector(".image-slot");
        if (item && image) transition = captureOrigin(item, image, "detail-entry", index);
      }
    } else if (previousRoute?.type === "home") {
      if (nextRoute.type === "detail" && nextRoute.collection === "featured") {
        const card = homeView.querySelector(`[data-featured-work="${CSS.escape(nextRoute.image)}"]`);
        const image = card?.querySelector(".ph");
        if (card && image) transition = captureOrigin(card, image, "detail-entry");
      } else if (nextRoute.type === "gallery") {
        const card = homeView.querySelector(`[data-gallery-link="${CSS.escape(nextRoute.gallery)}"]`);
        const image = card?.querySelector(".gallery-cycler");
        const index = Number(image?.dataset.slideIndex || 0);
        if (card && image) transition = captureOrigin(card, image, "gallery-entry", index);
      }
    }
    pendingTransition = transition;
    if (nextRoute.type === "detail") detailEntryOrigin = transition || detailEntryOrigin;
    if (nextRoute.type === "gallery" && transition?.liveCard) galleryEntryOrigin = transition;
    previousRoute = nextRoute;
    renderRoute();
  });
  previousRoute = getRoute();
  renderRoute();
})();
