const botao = document.getElementById("btn-navegar");

botao.addEventListener("click", function() {
    window.location.href = "./pages/cadastro.html";
});

const btNext = document.getElementById('nextSlide')
const btPrevious = document.getElementById('previousSlide')
const btAutoplay = document.getElementById('toggleAutoplay')
const slider = document.querySelector('.slider')
const content = document.querySelector('.content')
const slideArea = document.querySelector('.slide')

const { width: slideWidth } = window.getComputedStyle(slider)
const { width: contentWidth } = window.getComputedStyle(content)

let currentSlide = 0;

const slideProps = {
    width: parseInt(slideWidth),
    scroll: 0,
}

function setCurrentDot() {
    const dots = document.querySelectorAll('.dot')
    for(let dot of dots) {
        dot.classList.remove('current')
    }
    dots[currentSlide].classList.add('current')
}

function controlSlide({ target: { id} }) {
    const contentLength = content.children.length;
    switch (id) {
        case 'nextSlide':{
          if(slideProps.scroll + slideProps.width < parseInt(contentWidth)){
          slideProps.scroll += slideProps.width;
          }
          if(currentSlide < contentLength - 1) {
              currentSlide += 1;
              setCurrentDot()
          }
          return slider.scrollLeft = slideProps.scroll;
        }
        case 'previousSlide': {
            if(currentSlide > 0) {
                currentSlide -= 1;
                setCurrentDot()
            }
          slideProps.scroll = slideProps.scroll - slideProps.width < 0 ? 0 : slideProps.scroll - slideProps.width;
          return slider.scrollLeft = slideProps.scroll;
        }
        default:
            break;
    }
}

btNext.addEventListener('click', controlSlide)
btPrevious.addEventListener('click', controlSlide)

const autoplayTime = 5000

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

let autoplay;
let userPaused = reduceMotion;

function nextOrRestart() {
    const contentLength = content.children.length;
    if(currentSlide === contentLength - 1) {
        currentSlide = 0;
        slideProps.scroll = 0;
        setCurrentDot()
        slider.scrollLeft = 0;
    } else {
        controlSlide({ target: { id: 'nextSlide' } })
    }
}

function stopAutoplay() {
    clearInterval(autoplay)
}

function startAutoplay() {
    stopAutoplay()
    if(!userPaused) {
        autoplay = setInterval(nextOrRestart, autoplayTime)
    }
}

function toggleAutoplay() {
    userPaused = !userPaused;
    btAutoplay.textContent = userPaused ? 'Continuar' : 'Pausar';
    startAutoplay()
}

btAutoplay.addEventListener('click', toggleAutoplay)

slideArea.addEventListener('mouseenter', stopAutoplay)
slideArea.addEventListener('mouseleave', startAutoplay)
slideArea.addEventListener('focusin', stopAutoplay)
slideArea.addEventListener('focusout', startAutoplay)

window.onload = () => {
    const contentLength = content.children.length;
    for (let index = 0; index < contentLength - 1; index += 1) {
        const newDot = slider.parentElement.querySelector('.dot').cloneNode();
        slider.parentElement.querySelector('.length-dots').appendChild(newDot)
    }
    setCurrentDot();

    if(reduceMotion) {
        btAutoplay.textContent = 'Continuar'
    }
    startAutoplay();
}