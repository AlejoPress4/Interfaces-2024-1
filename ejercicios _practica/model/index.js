if(document.getElementById("ButtonModal")){
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("ButtonModal");
    var span = document.getElementsByClassName("close")[0];
    var body = document.getElementsByTagName("body")[0];

    GamepadButton.onclick = function() {
        modal.style.display = "block"; //Que se muestre en pantalla
        body.style.position = "static"; //Que no se pueda hacer scroll
        body.style.height = "100%";
        body.style.overflow = "hidden";
    }
    span.onclick = function() {
        modal.style.display = "none"; //Que se oculte
        body.style.position = "inherit"; //Que se pueda hacer scroll
        body.style.height = "auto";
        body.style.overflow = "visible";
    }
}