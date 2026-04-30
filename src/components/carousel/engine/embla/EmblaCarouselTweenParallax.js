const TWEEN_FACTOR_BASE = 0.2

let tweenFactor = 0
let tweenNodes = []
let tweenLastTranslate = []
let tweenBounds = []
let parallaxSlideRegistry = []
let parallaxLoopPointsBySlide = new Map()
let parallaxFramePending = false
let parallaxQueuedApi = null
let parallaxQueuedEvent = undefined

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const setTweenBounds = () => {
  tweenBounds = tweenNodes.map((node) => {
    const layerWidth = node?.offsetWidth || 0
    const frameWidth = node?.parentElement?.offsetWidth || 0
    const imageWidth = node?.querySelector('.embla__parallax__img')?.offsetWidth || 0
    // Avec la structure officielle, c'est l'image (pas le layer) qui déborde du cadre.
    const overflow = Math.max(0, imageWidth - frameWidth)
    const halfOverflow = overflow / 2

    return {
      layerWidth,
      minX: -halfOverflow,
      maxX: halfOverflow,
      baseX: 0,
    }
  })
}

const setTweenNodes = (emblaApi) => {
  tweenNodes = emblaApi.slideNodes().map((slideNode) => {
    return slideNode.querySelector('.embla__parallax__layer')
  })
  tweenLastTranslate = new Array(tweenNodes.length).fill(NaN)
  setTweenBounds()
}

const setTweenFactor = (emblaApi, parallaxFactor) => {
  const snapList = emblaApi.scrollSnapList()
  const baseFactor = parallaxFactor ?? TWEEN_FACTOR_BASE
  tweenFactor = baseFactor * snapList.length
}

const setParallaxCache = (emblaApi) => {
  const engine = emblaApi.internalEngine()
  parallaxSlideRegistry = engine.slideRegistry.map((slideIndexes) => slideIndexes.slice())
  parallaxLoopPointsBySlide.clear()

  if (!engine.options.loop) {
    return
  }

  engine.slideLooper.loopPoints.forEach((loopPoint) => {
    if (!parallaxLoopPointsBySlide.has(loopPoint.index)) {
      parallaxLoopPointsBySlide.set(loopPoint.index, [])
    }
    parallaxLoopPointsBySlide.get(loopPoint.index).push(loopPoint)
  })
}

const tweenParallax = (emblaApi, event) => {
  const engine = emblaApi.internalEngine()
  const scrollProgress = emblaApi.scrollProgress()
  const isScrollEvent = event?.type === 'scroll'
  const snapList = emblaApi.scrollSnapList()

  // Optimisation: pendant scroll, ne traiter que les slides visibles
  const slidesInView = isScrollEvent ? new Set(emblaApi.slidesInView()) : null

  // Parcourir tous les snaps (nécessaire pour la logique loop)
  snapList.forEach((scrollSnap, snapIndex) => {
    let diffToTarget = scrollSnap - scrollProgress
    const slidesInSnap = parallaxSlideRegistry[snapIndex] || engine.slideRegistry[snapIndex]

    slidesInSnap.forEach((slideIndex) => {
      // Skip slides hors viewport pendant scroll
      if (isScrollEvent && !slidesInView.has(slideIndex)) {
        return
      }

      if (engine.options.loop) {
        const loopItems = parallaxLoopPointsBySlide.get(slideIndex) || []
        loopItems.forEach((loopItem) => {
          const target = loopItem.target()

          if (slideIndex === loopItem.index && target !== 0) {
            const sign = Math.sign(target)

            if (sign === -1) {
              diffToTarget = scrollSnap - (1 + scrollProgress)
            }
            if (sign === 1) {
              diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          }
        })
      }

      const tweenNode = tweenNodes[slideIndex]
      const bounds = tweenBounds[slideIndex]
      if (!tweenNode || !bounds?.layerWidth) {
        return
      }

      const rawTranslatePercent = diffToTarget * (-1 * tweenFactor) * 100
      const rawTranslatePx = (rawTranslatePercent / 100) * bounds.layerWidth
      // Contraintes géométriques: x <= 0 et x + w >= cadre.w
      const translatePx = clamp(bounds.baseX + rawTranslatePx, bounds.minX, bounds.maxX)
      const translatePercent = (translatePx / bounds.layerWidth) * 100

      if (tweenLastTranslate[slideIndex] !== translatePercent) {
        tweenLastTranslate[slideIndex] = translatePercent
        tweenNode.style.transform = `translateX(${translatePercent}%)`
      }
    })
  })
}

const requestTweenParallax = (emblaApi, event) => {
  parallaxQueuedApi = emblaApi
  parallaxQueuedEvent = event

  if (parallaxFramePending) {
    return
  }

  parallaxFramePending = true
  requestAnimationFrame(() => {
    parallaxFramePending = false
    if (!parallaxQueuedApi) {
      return
    }
    tweenParallax(parallaxQueuedApi, parallaxQueuedEvent)
  })
}

export const setupTweenParallax = (emblaApi, parallaxFactor) => {
  setTweenNodes(emblaApi)
  setTweenFactor(emblaApi, parallaxFactor)
  setParallaxCache(emblaApi)
  tweenParallax(emblaApi)

  emblaApi
    .on('reInit', (api) => setTweenNodes(api))
    .on('reInit', (api) => {
      setTweenFactor(api, parallaxFactor)
      setParallaxCache(api)
    })
    .on('reInit', (api, eventName) => tweenParallax(api, eventName))
    .on('scroll', (api, eventName) => requestTweenParallax(api, eventName))
    .on('slideFocus', (api, eventName) => requestTweenParallax(api, eventName))
}



