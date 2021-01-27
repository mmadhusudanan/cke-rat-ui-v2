function hasClass(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function addClass(el, className) {
	if (el.classList) el.classList.add(className);
	else if (!hasClass(el, className)) el.className += " " + className;
}
function removeClass(el, className) {
	if (el.classList) el.classList.remove(className);
	else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
}

function triggerOpen(id)
{	
	var panelClass = 'js-cd-panel-main'
	var panel = document.getElementsByClassName(panelClass)[0];
	
	setStageData(id);
	addClass(panel, 'cd-panel--is-visible');

	//close panel when clicking on 'x' or outside the panel
	panel.addEventListener('click', function(event){
		if( hasClass(event.target, 'js-cd-close') || hasClass(event.target, panelClass)) {
			event.preventDefault();
			removeClass(panel, 'cd-panel--is-visible');
		}
	});
}

function setStageData(stageId)
{
	console.log("checking..."+stageId);
	const stg = getStageDataFromId(stageId)	
	const name = stg == null ? stageId:stg.name;
	const type = stg == null ? stageId:stg.type;
	const desc = stg == null ? "":stg.desc;

	document.querySelector(".cd-panel__header_title").innerHTML = " VIEW/EDIT "+type + " - " + name;
	document.querySelector("#func-text-area").hidden = true;		
	document.querySelector("#content-image").hidden = true;	
	document.querySelector("#input_stage_id").innerHTML = stageId;			
	document.querySelector("#input_stage_name").textContent = name;
	document.querySelector("#input_stage_desc").textContent = desc;
	document.querySelector("#input_stage_func_def").textContent = (stg == null || stg.func_def == null) ? "":stg.func_def;			

	if(stageId.indexOf("-TT") > -1 || stageId.indexOf("GBL-") > -1)
	{
		document.querySelector("#content-image").hidden = false;			
		document.querySelector("#content-image img").src = "./images/"+stageId+".png"
	}
	else	
		document.querySelector("#func-text-area").hidden = false;			
		
}