window.onload = initialisationimage();
fige=0; // on peut selectionner les points du pavé. sinon, c'est figé, et donc on ne peut pas cliquer
aide=0;
difficulte=0;
tutorielencours=false;
function tutoriel(nbetape)
{
	
	ecritconsigne('Sur l\'axe gradué suivant, placer le point H(2,25) :');
	var canvas = document.getElementById('mon_canvas');
	if(!canvas)
	{
		alert("Impossible de récupérer le canvas");
		return;
	}
	var context = canvas.getContext('2d');
	if(!context)
	{
		alert("Impossible de récupérer le context du canvas");
		return;
	}

	if (nbetape==0)
	{
		tutorielencours=true;
		fige=1;
		document.getElementById('tuto').style.backgroundColor='#ffd34e';
		img = new Image();   // Crée un nouvel objet Image
		img.onload = function(){ 
		context.drawImage(img, -7,7);
		}
		img.src = './tuto/1.png'; // Définit le chemin vers sa source
		setTimeout(function() 
		{
			tutoriel(nbetape+1);
		}, 2000);
	}
	else if (nbetape<7)
		{
			fige=1;
			img = new Image();   // Crée un nouvel objet Image
			img.onload = function()
			{ 
				context.drawImage(img, -7,7);
			}
			img.src = './tuto/'+nbetape+'.png'; // Définit le chemin vers sa source
			setTimeout(function() {
						fige=1;tutoriel(nbetape+1);
						}, 4000);
						
		}
		else
		{
			fige=0;
			tutorielencours=false;
			img.src = './point.png';
			document.getElementById('tuto').style.backgroundColor='#8ab1d9';
			 initialisation();
		}

}
function changedifficulte()
{
	if (tutorielencours==false)
	{
		if (difficulte==0)
		{
			document.getElementById('diff').value="difficulte=difficile";
			difficulte=1;
			initialisation();
		}
		else
		{
			document.getElementById('diff').value="difficulte=simple";
			difficulte=0;
			initialisation();
		}
	}
}
function arrondis100e(nb)
{
	return Math.round(nb*100)/100;
}
function initialisation()
{
	if ((tutorielencours==false)&&(fige==0))
	{
		var canvas = document.getElementById('mon_canvas');
		if(!canvas)
		{
			alert("Impossible de récupérer le canvas");
			return;
		}
		var context = canvas.getContext('2d');
		if(!context)
		{
			alert("Impossible de récupérer le context du canvas");
			return;
		}
		Ox=Math.floor(canvas.width/2);
		Oy=Math.floor(canvas.height/2);
		Ax=canvas.width-7;
		Ay=Oy;


			decoupex = Math.floor(5+Math.random()*3)
		   
		   if (difficulte==0)
		   {
				tableau_pas=[2,4,5,10];
		   }
		   else
		   {
			   tableau_pas=[3,6,8];
		   }
			pas=tableau_pas[Math.floor(Math.random()*tableau_pas.length)]
			signe=[-1,1]
			signex=signe[Math.floor(Math.random()*signe.length)]
			
			coorx = signex*Math.floor(Math.random()*(decoupex)) + arrondis100e(Math.floor(Math.random()*pas)/pas);
			
			
			dessinedroite(context,Ox,Oy,Ax,Ay,decoupex);
			positionnelettreH(context,coorx);
			clearCanvas(context, canvas,decoupex) ;
	}
}

function initialisationimage()
{
	 img = new Image();   // Crée un nouvel objet Image
	img.onload = function(){ 
		initialisation();
	}
	img.src = './point.png'; // Définit le chemin vers sa source
}

function afficheaide()
{
	if (tutorielencours==false)
	{
		if (aide==0)
		{
			
			aide=1;
		}
		else
		{
			aide=0;
		}
	}
}

function ecritconsigne(message) {
	document.getElementById('consigne').style.backgroundColor='#edffe7';
    document.getElementById('consigne').innerHTML=message;
}
function ecritcorrection(message,boolreussite)
{
	if (boolreussite)
	{
		document.getElementById('consigne').style.backgroundColor='#85C630';
	}
	else
	{
		document.getElementById('consigne').style.backgroundColor='#EACFB8';
	}
        document.getElementById('consigne').innerHTML=message;
}
function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      
      var canvas = document.getElementById('mon_canvas');
      var context = canvas.getContext('2d');

      canvas.addEventListener('mousemove', function(evt) {
if (fige==0)
{
		var mousePos = getMousePos(canvas, evt);
		canvas.style.cursor='pointer';
		coordx_entier=arrondis100e(Math.round((mousePos.x-Ox)/((Ax-Ox)/(decoupex))));
		coordx_pas=arrondis100e(Math.round((mousePos.x-Ox-coordx_entier*((Ax-Ox)/decoupex))/((Ax-Ox)/(decoupex*pas)))*(1/pas));
		coordx=coordx_entier+coordx_pas;
		clearCanvas(context, canvas,decoupex)

		if (aide==1)
		{
			correction(context,Ox+(Ax-Ox)*coordx/decoupex);
		}
		context.drawImage(img, Ox+(Ax-Ox)*coordx/decoupex-7, Oy-7);		
}
      }, false);
        canvas.addEventListener('click', function(evt) {
			        var mousePos = getMousePos(canvas, evt);
if (fige==0)
{
			posx=Ox+(Ax-Ox)*mathcoorx/decoupex;
	
			coordx_entier=arrondis100e(Math.round((mousePos.x-Ox)/((Ax-Ox)/(decoupex))));
			coordx_pas=arrondis100e(Math.round((mousePos.x-Ox-coordx_entier*((Ax-Ox)/decoupex))/((Ax-Ox)/(decoupex*pas)))*(1/pas));
			coordx=arrondis100e(coordx_entier+coordx_pas);
							
			if (coordx==mathcoorx)
			{
				if (difficulte==0)
				{
					ecritcorrection('BRAVO!! Tu as trouvé le point H('+affichenombreavecvirgule(mathcoorx)+') !',true);
				}
				else
				{
					ecritcorrection('BRAVO!! Tu as trouvé le point H(<div class="fraction"><span class="fup">'+Math.round(mathcoorx*pas)+'</span><span class="bar">/</span><span class="fdn">'+pas+'</span></div>) !',true);
				}
				
				ecritlettre(context,"H",posx,Oy);
			}
			else
			{
				if (difficulte==0)
				{
					ecritcorrection('NON!!!!! Tu n as pas trouvé le point H('+affichenombreavecvirgule(mathcoorx)+') mais H('+affichenombreavecvirgule(coordx)+') !',false);
				}
				else
				{
					ecritcorrection('NON!!!!! Tu n as pas trouvé le point H(<div class="fraction"><span class="fup">'+Math.round(mathcoorx*pas)+'</span><span class="bar">/</span><span class="fdn">'+pas+'</span></div>) mais H(<div class="fraction"><span class="fup">'+Math.round(coordx*pas)+'</span><span class="bar">/</span><span class="fdn">'+pas+'</span></div>)',false);
				}
				
				
				correction(context,posx);
				ecritlettre(context,"H",posx,Oy);
				context.drawImage(img, posx-7,Oy-7);
			}
			fige=1;
			setTimeout(function() {
				fige=0;initialisation();
				}, 3000);
	}},false);
	  
function correction(context,x)
{
	context.setLineDash([5]);
	context.strokeStyle='red'; 
	context.lineWidth=2; 
	context.moveTo(Ox,Oy);//On se déplace au coin inferieur gauche
	context.lineTo(x,Oy);
	context.stroke(); 

}
function clearCanvas(context, canvas,decoupex,decoupey,decoupez) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  var w = canvas.width;
  canvas.width = 1;
  canvas.width = w;

    var canvas = document.getElementById('mon_canvas');
        if(!canvas)
        {
            alert("Impossible de récupérer le canvas");
            return;
        }

    var context = canvas.getContext('2d');
        if(!context)
        {
            alert("Impossible de récupérer le context du canvas");
            return;
        }
        dessinedroite(context,Ox,Oy,Ax,Ay,decoupex);
       
	positionnelettreH(context,coorx);

}

function reset()
{
	var canvas = document.getElementById('mon_canvas');
        if(!canvas)
        {
            alert("Impossible de récupérer le canvas");
            return;
        }

    var context = canvas.getContext('2d');
        if(!context)
        {
            alert("Impossible de récupérer le context du canvas");
            return;
        }
        clearCanvas(context, canvas) ; 
}
function ecritlettre(context,lettre,x,y)
{
	context.font = "13pt Calibri,Geneva,Arial";
	context.fillText(lettre,x-5,y+20);
}

function dessinedroite(context,Ox,Oy,Ax,Ay,decoupex)
{
	context.beginPath();//On démarre un nouveau trace
	context.setLineDash([0]);
	Gx=Ox-(Ax-Ox);
	Gy=Oy;
	

	for (var i = 0; i < decoupex+1; i++) 
	{
		if (i<decoupex)
		{
			context.moveTo(Ox+(Ax-Ox)*i/decoupex,Oy-5);
			context.lineTo(Ox+(Ax-Ox)*i/decoupex,Oy+5);
		}
		context.moveTo(Ox-(Ax-Ox)*i/decoupex,Oy-5);
		context.lineTo(Ox-(Ax-Ox)*i/decoupex,Oy+5);
		for (var j = 0; j < pas; j++) 
		{
			if (i<decoupex)
			{
			context.moveTo(Ox+(Ax-Ox)*i/decoupex+j*(Ax-Ox)/(decoupex*pas),Oy-2);
			context.lineTo(Ox+(Ax-Ox)*i/decoupex+j*(Ax-Ox)/(decoupex*pas),Oy+2);
			}
			context.moveTo(Ox-(Ax-Ox)*i/decoupex-j*(Ax-Ox)/(decoupex*pas),Oy-2);
			context.lineTo(Ox-(Ax-Ox)*i/decoupex-j*(Ax-Ox)/(decoupex*pas),Oy+2);
		}
	}

	
	ecritlettre(context,"1",Ox+(Ax-Ox)/decoupex,Oy);	
	ecritlettre(context,"O",Ox,Oy);	
	//ecritlettre(context,"A",Ax,Ay);
	//ecritlettre(context,"B",Bx,By);
	//ecritlettre(context,"F",Fx,Fy);
	context.moveTo(Gx,Gy);
	context.lineTo(Ax,Ay);
	context.lineTo(Ax-7,Ay-7);
	context.moveTo(Ax,Ay);
	context.lineTo(Ax-7,Ay+7);
	context.stroke();//On trace seulement les lignes pleines
	context.closePath();
	}

function affichenombreavecvirgule(nombre)
{
	return nombre.toString().replace(".",",");
}

function positionnelettreH(context,coorx)
{
		context.beginPath();//On démarre un nouveau trace

	pasx=(Ax-Ox)/decoupex;
		posx=Ox+coorx*pas;
		
		mathcoorx=coorx;
		//ecritlettre(context,"H",posx,posy);
		if (difficulte==0)
		{
			var nombre=arrondis100e(mathcoorx);
			ecritconsigne('Sur l\'axe gradué suivant, placer le point H('+affichenombreavecvirgule(nombre)+') :');
		}
		else
		{
			ecritconsigne('Sur l\'axe gradué suivant, placer le point H(<div class="fraction"><span class="fup">'+Math.round(mathcoorx*pas)+'</span><span class="bar">/</span><span class="fdn">'+pas+'</span></div>) :');
		}
		//alert(mathcoorx+' '+mathcoory+' '+mathcoorz);
			context.closePath();
}
