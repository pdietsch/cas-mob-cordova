let menu ={
    initialize : function(){
        let menus = document.getElementsByClassName("menu-item");
        for(let menu of menus){
            menu.addEventListener("click", () =>document.location.href = menu.dataset.link);
        }

    }
};
menu.initialize();