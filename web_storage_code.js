if (typeof(Storage) !== "undefined") {
    console.log("🎉 Este navegador soporta Web Storage 🎉")

    localStorage.removeItem("viruses_only_names"),
    localStorage.setItem("viruses_only_names", "[]");


    function $add_virus(name, img_url="", biography="", origin=""){
        var viruses_only_names = JSON.parse(window.localStorage.getItem("viruses_only_names"));
		
		if (viruses_only_names.includes(name)) {
            return [-1, "Ups!, el virus '" + name + "' ya existe"];
        }
        if (name == undefined || name == ""){
            return [-2, "Intento para añadir virus no posible: Tienes que pasar por lo menos el nombre del virus"];
        }
        localStorage.setItem(name, JSON.stringify( {"img_url": img_url, "biography": biography, "origin":origin } ));
        viruses_only_names.push(name)
        localStorage.setItem("viruses_only_names", JSON.stringify(viruses_only_names));
        return [0, name + " se ha agregado"];
    }
    function $get_viruses() {
        var viruses_only_names = JSON.parse(window.localStorage.getItem("viruses_only_names"));
        var viruses_full = [];
        for (virus of viruses_only_names){
            var data = JSON.parse(window.localStorage.getItem( virus ));
            data["name"] = virus;
            viruses_full.push(data);
        }
        return viruses_full;
    }
    function $delete_virus(name) {
        if (name == undefined) {
            return [-1, "Attempt to delete '" +name+ " not possible: You need to pass the virus name"]
        }
        var viruses_only_names = JSON.parse(window.localStorage.getItem("viruses_only_names"));
        if (viruses_only_names.includes(name)) {
            for( var i = 0; i < viruses_only_names.length; i++) { 
                if ( viruses_only_names[i] == name) {
                    viruses_only_names.splice(i, 1)
                    localStorage.setItem("viruses_only_names", JSON.stringify( viruses_only_names));
                    localStorage.removeItem(name);
                    return [0, name + " Has been succesfully deleted"]
                }
            }
        }
        else {
            return [-2, "Attempt to delete '" +name+ "' but it doesn't exists"]
        }   
    }

    function $update_virus(name, img_url, biography, origin) {
        if (name == undefined) {
            return [-1, "Attempt to update '" +name+ " not possible: You need to pass the virus name"]
        }
        var viruses_only_names = JSON.parse(window.localStorage.getItem("viruses_only_names"));
        if (viruses_only_names.includes(name)) {
            var update_this_virus = JSON.parse(window.localStorage.getItem(name));
            if ( typeof img_url !== 'undefined') {
                update_this_virus["img_url"] = img_url;
            }
            if ( typeof biography !== 'undefined') {
                update_this_virus["biography"] = biography;
            }
            if ( typeof origin !== 'undefined') {
                update_this_virus["origin"] = origin;
            }
            localStorage.setItem(name, JSON.stringify( update_this_virus));
            return [0, name + " Se han guardado los cambios"]
        }
        else {
            return [-2, "Attempt to update '" +name+ "' but it doesn't exists"]
        }   
    }

    function $get_viruses_only_names() {
        return JSON.parse(window.localStorage.getItem("viruses_only_names"));
    }
}
else {
    alert("Este navegador NO soporta Web Storage");
    console.log("Este navegador NO soporta Web Storage");
}