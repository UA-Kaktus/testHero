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

    mobileMenu();
    tabs();

    function mobileMenu() {
        SELECTORS.burger.addEventListener('click', () => {
            SELECTORS.mobileMenu.style.left = '0';
            document.body.style.overflow = 'hidden';
        });
    
        SELECTORS.mobileClose.addEventListener('click', () => {
            SELECTORS.mobileMenu.style.left = '-100%';
            document.body.style.overflow = '';
        });
    
        SELECTORS.mobileMenuSingleLinks.forEach(el => {
            el.addEventListener('click', () => {
                SELECTORS.mobileMenu.style.left = '-100%';
                document.body.style.overflow = '';
            })
        });
    }

    function tabs() {
        SELECTORS.tabsMore.forEach((el,ind) => {
            el.addEventListener('click', () => {
                SELECTORS.tabsInfo.forEach((arrEl, arrInd) => {
                    if (ind != arrInd) {
                        arrEl.dataset.visible = false;
                    } else {
                        if (arrEl.dataset.visible === 'true') {
                            arrEl.dataset.visible = false;
                        } else if (arrEl.dataset.visible === 'false'){
                            arrEl.dataset.visible = true;
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
                SELECTORS.tabsMore[ind].classList.remove('table-item__rate-detail_less');
                SELECTORS.tabsMore[ind].innerHTML = 'Más información';
            })
        })
    }
});