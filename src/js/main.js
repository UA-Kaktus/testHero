document.addEventListener('DOMContentLoaded', () => {
    const SELECTORS = {
        burger: document.querySelector('.header__burger'),
        mobileMenu: document.querySelector('.mobile-menu'),
        mobileClose: document.querySelector('.mobile-menu__close'),
        mobileMenuSingleLinks: document.querySelectorAll('.mobile-menu__list li:not([data-multy="true"])'),
        mobileMenuMultyLinks: document.querySelectorAll('.mobile-menu__list li[data-multy="true"]'),
        tabsMore: document.querySelectorAll('[data-js="main-detail-btn"]'),
        tabsInfo: document.querySelectorAll('.table-item__info'),
        tabsLessOnly: document.querySelectorAll('[data-js="main-detail-btn-close"]'),
    }

    function listinerForMenu(selector, shiftLeft, overflow) {
        selector.addEventListener('click', () => {
            SELECTORS.mobileMenu.style.left = shiftLeft;
            document.body.style.overflow = overflow;
        });
    }

    listinerForMenu(SELECTORS.burger, '0', 'hidden');
    listinerForMenu(SELECTORS.mobileClose, '-100%', '');

    SELECTORS.mobileMenuSingleLinks.forEach(el => {
        listinerForMenu(el, '-100%', '');
    });
    //--
    tabs();

    function calcTabHeight(infoBlock) {
        let maxHeigth = 0;
        const innerElements = infoBlock.querySelectorAll('.table-item__info-slider, .table-item__info-main');

        if (window.innerWidth < 992) {
            innerElements.forEach(el => {
                maxHeigth = maxHeigth + +window.getComputedStyle(el).height.slice(0,-2);
                console.log(+window.getComputedStyle(el).height.slice(0,-2));
            });
            maxHeigth = maxHeigth + 33 + 12;
        } else {
            innerElements.forEach( el => {
                if (+window.getComputedStyle(el).height.slice(0,-2) > maxHeigth) {
                    maxHeigth = +window.getComputedStyle(el).height.slice(0,-2);
                }
            });
            maxHeigth = maxHeigth + 20;
            console.log(window.getComputedStyle(infoBlock.querySelector('.table-item__info-descr')).height);
        }

        infoBlock.style.height = `${maxHeigth}px`;
    }

    function tabs() {
        SELECTORS.tabsInfo.forEach((arrEl) => {
            if (arrEl.dataset.visible === 'true') {
                calcTabHeight(arrEl);
            }
        });

        SELECTORS.tabsMore.forEach((el,ind) => {
            el.addEventListener('click', () => {
                SELECTORS.tabsInfo.forEach((arrEl, arrInd) => {
                    if (ind != arrInd) {
                        arrEl.dataset.visible = false;
                        arrEl.style.height = `0px`;
                    } else {
                        if (arrEl.dataset.visible === 'true') {
                            arrEl.dataset.visible = false;
                            arrEl.style.height = `0px`;
                        } else if (arrEl.dataset.visible === 'false'){
                            arrEl.dataset.visible = true;

                            calcTabHeight(arrEl);
                        }
                    }
                });

                SELECTORS.tabsMore.forEach((el,index) => {
                    if (ind != index) {
                        el.classList.remove('table-item__rate-detail_less');
                        el.innerHTML = 'Más información';
                    } else {
                        if (el.classList.contains('table-item__rate-detail_less')) {
                            el.classList.remove('table-item__rate-detail_less');
                        el.innerHTML = 'Más información';
                        } else {
                            el.classList.add('table-item__rate-detail_less');
                            el.innerHTML = 'Menos información';
                        }
                    }
                });
            });
        });
    
        SELECTORS.tabsLessOnly.forEach((el,ind) => {
            el.addEventListener('click', () => {
                SELECTORS.tabsInfo[ind].dataset.visible = false;
                SELECTORS.tabsInfo[ind].style.height = '0px';
                SELECTORS.tabsMore[ind].classList.remove('table-item__rate-detail_less');
                SELECTORS.tabsMore[ind].innerHTML = 'Más información';
            })
        });
    }
});