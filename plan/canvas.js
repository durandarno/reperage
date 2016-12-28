window.onload = initialisationimage();
fige=0; // on peut selectionner les points du pavé. sinon, c'est figé, et donc on ne peut pas cliquer
aide=0;
tutorielencours=false;
function tutoriel(nbetape)
{
	ecritconsigne('Dans le repère suivant, placer le point H de coordonnées (-2,5;+4) :');
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
		}, 1000);
	}
	else if (nbetape<10)
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

function initialisationimage()
{
	 img = new Image();   // Crée un nouvel objet Image
	img.onload = function(){ 
		initialisation();
	}
	img.src = './point.png'; // Définit le chemin vers sa source
}
function arrondis100e(nb)
{
	return Math.round(nb*100)/100;
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
function ecritcorrection(message)
{
		document.getElementById('consigne').style.backgroundColor='#EACFB8';
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

canvas.addEventListener('mousemove', function(evt) 
	{
		if (fige==0)
		{
				var mousePos = getMousePos(canvas, evt);
				canvas.style.cursor='pointer';
				// var img = new Image();   // Crée un nouvel objet Image
					//	img.src = 'http://mathix.org/reperage/plan/point.png'; // Définit le chemin vers sa source
				coordx_entier=arrondis100e(Math.round((mousePos.x-Ox)/((Ax-Ox)/(decoupex))));
				coordx_pas=arrondis100e(Math.round((mousePos.x-Ox-coordx_entier*((Ax-Ox)/decoupex))/((Ax-Ox)/(decoupex*pas)))*(1/pas));
				coordx=coordx_entier+coordx_pas;
				coordy_entier=arrondis100e(Math.round((mousePos.y-Oy)/((By-Oy)/(decoupey))));
				coordy_pas=arrondis100e(Math.round((mousePos.y-Oy-coordy_entier*((By-Oy)/decoupey))/((By-Oy)/(decoupey*pas)))*(1/pas));
				coordy=coordy_entier+coordy_pas;
				clearCanvas(context, canvas,decoupex,decoupey)

				if (aide==1)
				{
					correction(context,Ox+(Ax-Ox)*coordx/decoupex,Oy+(By-Oy)*coordy/decoupey);
				}
				context.drawImage(img, Ox+(Ax-Ox)*coordx/decoupex-7, Oy+(By-Oy)*coordy/decoupey-7);		
		}
	}, false);
	
	  
canvas.addEventListener('click', function(evt) 
	{
		var mousePos = getMousePos(canvas, evt);
		if (fige==0)
		{
					posx=Ox+(Ax-Ox)*mathcoorx/decoupex;
					posy=Oy+(By-Oy)*mathcoory/decoupey;
			
					coordx_entier=arrondis100e(Math.round((mousePos.x-Ox)/((Ax-Ox)/(decoupex))));
					coordx_pas=arrondis100e(Math.round((mousePos.x-Ox-coordx_entier*((Ax-Ox)/decoupex))/((Ax-Ox)/(decoupex*pas)))*(1/pas));
					coordx=coordx_entier+coordx_pas;
					coordy_entier=arrondis100e(Math.round((mousePos.y-Oy)/((By-Oy)/(decoupey))));
					coordy_pas=arrondis100e(Math.round((mousePos.y-Oy-coordy_entier*((By-Oy)/decoupey))/((By-Oy)/(decoupey*pas)))*(1/pas));
					coordy=coordy_entier+coordy_pas;


						
					if ((coordx==mathcoorx)&&(coordy==mathcoory))
					{
						ecritlettre(context,"H",posx,posy);
						ecritcorrection('BRAVO Tu as trouvé le point H de coordonnées('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+')');
					}
					else
					{
						ecritlettre(context,"H",posx,posy);
						correction(context,posx,posy);
						context.drawImage(img, posx-7, posy-7);
						ecritcorrection('NON!!!!! Tu n as pas trouvé le point H de coordonnées('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+') mais ('+affichenombreavecvirgule(coordx)+';'+affichenombreavecvirgule(coordy)+')');
					}
					fige=1;
					setTimeout(function() {
						fige=0;initialisation();
						}, 3000);
		}
	},false);
	  
function correction(context,x,y)
{
	context.setLineDash([5]);
	context.strokeStyle='red'; 
	context.lineWidth=2; 
	context.moveTo(Ox,y);//On se déplace au coin inferieur gauche
	context.lineTo(x,y);
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
        dessineplan(context,Ox,Oy,Ax,Ay,Bx,By,decoupex,decoupey);
       
	positionnelettreH(context,coorx,coory);

}



function initialisation()
{
	if (tutorielencours==false)
	{
		var canvas = document.getElementById('mon_canvas');
		if(!canvas)
		{
			alert("Impossible de récupérer le canvas");
			return;
		}
		Ox=Math.floor(canvas.width/2);
		Oy=Math.floor(canvas.height/2);
		Bx=Ox;
		By=7;
		Ax=canvas.width-7;
		Ay=Oy;
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
		decoupex = Math.floor(5+Math.random()*3)
		decoupey = Math.floor(4+Math.random()*2)
		tableau_pas=[2,4,10];
		pas=tableau_pas[Math.floor(Math.random()*tableau_pas.length)]
		signe=[-1,1]
		signex=signe[Math.floor(Math.random()*signe.length)]
		signey=signe[Math.floor(Math.random()*signe.length)]
		coorx = signex*Math.floor(Math.random()*(decoupex)) + arrondis100e(Math.floor(Math.random()*pas)/pas);
		
		coory = signey*Math.floor(Math.random()*(decoupey))+ arrondis100e(Math.floor(Math.random()*pas)/pas);
		dessineplan(context,Ox,Oy,Ax,Ay,Bx,By,decoupex,decoupey);
		positionnelettreH(context,coorx,coory);
		clearCanvas(context, canvas,decoupex,decoupey) ;
	}
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
	context.fillText(lettre,x+5,y+15);
}

function dessineplan(context,Ox,Oy,Ax,Ay,Bx,By,decoupex,decoupey)	
{
	context.beginPath();//On démarre un nouveau trace
	context.setLineDash([0]);
	Gx=Ox-(Ax-Ox);
	Gy=Oy;
	Fx=Bx;
	Fy=Oy-(By-Oy);
	

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

	for (var i = 0; i < decoupey+1; i++) 
	{
		if (i<decoupey)
		{
		context.moveTo(Ox-5,Oy+(By-Oy)*i/decoupey);
		context.lineTo(Ox+5,Oy+(By-Oy)*i/decoupey);
		}
		context.moveTo(Ox-5,Oy-(By-Oy)*i/decoupey);
		context.lineTo(Ox+5,Oy-(By-Oy)*i/decoupey);
		for (var j = 0; j < pas; j++) 
		{
			if (i<decoupey)
			{
			context.moveTo(Ox-2,Oy+(By-Oy)*i/decoupey+j*(By-Oy)/(decoupey*pas));
			context.lineTo(Ox+2,Oy+(By-Oy)*i/decoupey+j*(By-Oy)/(decoupey*pas));
			}
			context.moveTo(Ox-2,Oy-(By-Oy)*i/decoupey+j*(By-Oy)/(decoupey*pas));
			context.lineTo(Ox+2,Oy-(By-Oy)*i/decoupey+j*(By-Oy)/(decoupey*pas));

		}
			context.moveTo(Ox-2,Oy-(By-Oy)*i/decoupey+pas*(By-Oy)/(decoupey*pas));

	}
	ecritlettre(context,"1",Ox,Oy+(By-Oy)/decoupey);	
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
	context.moveTo(Bx,By);
	context.lineTo(Fx,Fy);
	
	context.moveTo(Bx,By);
	context.lineTo(Bx-7,By+7);
	context.moveTo(Bx,By);
	context.lineTo(Bx+7,By+7);
	
	context.stroke();//On trace seulement les lignes pleines
	context.closePath();
}
function affichenombreavecvirgule(nombre)
{
	return nombre.toString().replace(".",",");
}

function positionnelettreH(context,coorx,coory)
{
	context.beginPath();//On démarre un nouveau trace
	pasx=(Ax-Ox)/decoupex;
	pasx=(By-Oy)/decoupey;
	posx=Ox+coorx*pas;
	posy=Oy+coory*pas;
	mathcoorx=coorx;
	mathcoory=coory;
	//ecritlettre(context,"H",posx,posy);
	ecritconsigne('Dans le repère suivant, placer le point H de coordonnées ('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+') :');
	//alert(mathcoorx+' '+mathcoory+' '+mathcoorz);
	context.closePath();
}
