function CreateAlert(msg, title="Alert!")
{
	const el = document.createElement("div");
	el.style.index = "100";
	el.className = "modal show";
	
	const html = `<div style='top:40%;color:#888888' class='modal-content center round animate-zoom card-4'>
	     <p class='large container'>${title}<span id='close-btn' class='right'>&times</span></p>
	     <hr/>
	     <p class='container padding'>${msg}</p>
	</div>`;
	
	el.innerHTML = html;
	document.body.appendChild(el);
	
	el.querySelector("#close-btn").addEventListener("click", event=>{
	    document.body.removeChild(el);
	});
}