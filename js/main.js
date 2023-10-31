const primaryNav = document.getElementById ("primary-navigation");
const navToggle = document.querySelector (".mobile-nav-toggle");

navToggle.addEventListener('click', ()  => {
   const visibility = primaryNav.getAttribute("data-visible");
   
   if (visibility === "false") {
      primaryNav.setAttribute ("data-visible", true);
      navToggle.setAttribute ("aria-expanded", true);
   } else if (visibility === "true") {
      primaryNav.setAttribute ("data-visible", false);
      navToggle.setAttribute ("aria-expanded", false);
   }
}); 

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
const isFlexColumn = window.getComputedStyle(tabList).flexDirection === "column";
const isFlexRow = window.getComputedStyle(tabList).flexDirection === "row";

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;

function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    const keydownUp = 38;
    const keydownDown = 40;

    if (isFlexColumn) {
        if (e.keyCode === keydownUp || e.keyCode === keydownDown) {
            tabs[tabFocus].setAttribute("tabindex", -1);

            if (e.keyCode === keydownDown) {
                tabFocus++;
                if (tabFocus >= tabs.length) {
                    tabFocus = 0;
                }
            } else if (e.keyCode === keydownUp) {
                tabFocus--;
                if (tabFocus < 0) {
                    tabFocus = tabs.length - 1;
                }

            }

            tabs[tabFocus].setAttribute("tabindex", 0);
            tabs[tabFocus].focus();
        }
    } if (isFlexRow) {
        if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
            tabs[tabFocus].setAttribute("tabindex", -1);

            if (e.keyCode === keydownRight) {
                tabFocus++;
                if (tabFocus >= tabs.length) {
                    tabFocus = 0;
                }
            } else if (e.keyCode === keydownLeft) {
                tabFocus--;
                if (tabFocus < 0) {
                    tabFocus = tabs.length - 1;
                }
            }

            tabs[tabFocus].setAttribute("tabindex", 0);
            tabs[tabFocus].focus();
        }
    }
}


function changeTabPanel(e) {
   const targetTab = e.target;
   const targetPanel = targetTab.getAttribute("aria-controls");
   const targetImage = targetTab.getAttribute("data-image");
   
   const tabContainer = targetTab.parentNode;
   const mainContainer = tabContainer.parentNode;
   const picContainer = document.querySelector(".pic-section")
   
   tabContainer
      .querySelector('[aria-selected="true"]')
      .setAttribute("aria-selected", false);
   
   targetTab.setAttribute("aria-selected", true);

   hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);
    
    hideContent(picContainer, 'picture');
    showContent(picContainer, [`#${targetImage}`]);
   }

   function hideContent(parent, content) {
      parent
         .querySelectorAll(content)
         .forEach((item) => item.setAttribute("hidden", true));
   }

   function showContent(parent, content) {
      parent.querySelector(content).removeAttribute('hidden');
   }
 
