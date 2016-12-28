window.onload = initialisationimage();
fige=0; // on peut selectionner les points du pavé. sinon, c'est figé, et donc on ne peut pas cliquer
aide=0;
difficulte=0;
tutorielencours=false;

function affichenombreavecvirgule(nombre)
{
	return nombre.toString().replace(".",",");
}
function tutoriel(nbetape)
{
	ecritconsigne('Dans le repère (O;I,J,K), placer le point H de coordonnées (2;1;1) :');
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

function afficheaide()
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
function changedifficulte()
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

function initialisationimage()
{
	img = new Image();   // Crée un nouvel objet Image
	img.onload = function()
	{		
		initialisation();
	}
	img.src = './point.png'; // Définit le chemin vers sa source
}
function correction(context,coorx,coory,coorz)
{
	pasx=(Bx-Ox)/decoupex;
	pasy_x=(Ax-Ox)/decoupey;
	pasy_y=(Ay-Oy)/decoupey;
	pasz=(Cy-Oy)/decoupez;
	posx=Ox+coorx*pasx+pasy_x*coory;
	posy=Oy+coory*pasy_y+pasz*coorz;
	context.strokeStyle='red'; 
	 context.lineWidth=4; 
	context.moveTo(Cx,Cy);//On se déplace au coin inferieur gauche
	context.lineTo(Cx+coorx*pasx,Cy);
	context.lineTo(Cx+coorx*pasx+pasy_x*coory,Cy+coory*pasy_y);
	context.lineTo(posx,posy);
	context.stroke(); 

}
function initialisation()
{
	Ox=10;
	Oy=120;
	Bx=380;
	By=Oy;
	Ax=110;
	Ay=10;
	Cx=Ox;
	Cy=370;
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
	decoupex = Math.floor(2+Math.random()*3);
	decoupey = Math.floor(2+Math.random()*2);
	decoupez = Math.floor(2+Math.random()*2);		
	echellex=1;
	echelley=1;
	echellez=1;
	if (difficulte==1)
	{
		while (echellex+echelley+echellez==3)
		{
			echellex=Math.floor(1.5+Math.random());
			echelley=Math.floor(1.5+Math.random());
			echellez=Math.floor(1.5+Math.random());
		}
	}
	coorx = Math.floor(Math.random()*(decoupex+0.9));
	coory = Math.floor(Math.random()*(decoupey+0.9));
	coorz = Math.floor(Math.random()*(decoupez+0.9));
	dessinepave(context,Ox,Oy,Ax,Ay,Bx,By,Cx,Cy,decoupex,decoupey,decoupez);
	positionnelettreH(context,coorx,coory,coorz);
	clearCanvas(context, canvas,decoupex,decoupey,decoupez) ;
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

function getMousePos(canvas, evt) 
{
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function desactivebouton(bool)
{
	bouton = document.getElementById('reset');
	bouton.disabled=bool;
}
var canvas = document.getElementById('mon_canvas');
var context = canvas.getContext('2d');

canvas.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	if (fige==0)
	{
		clearCanvas(context, canvas,decoupex,decoupey,decoupez);
		pasx=(Bx-Ox)/decoupex;
		pasy_x=(Ax-Ox)/decoupey;
		pasy_y=(Ay-Oy)/decoupey;
		pasz=(Cy-Oy)/decoupez;
		precision=5;
		canvas.style.cursor='auto';
		for (var i = 0; i < decoupex+1; i++) 
		{
			for (var j = 0; j < decoupey+1; j++) 
			{
					for (var k = 0; k < decoupez+1; k++) 
				{
					if ((Ox+i*pasx+pasy_x*j-precision<mousePos.x)&&(Ox+i*pasx+pasy_x*j+precision>mousePos.x))
					{
						if ((Oy+k*pasz+pasy_y*j-precision<mousePos.y)&&(Oy+k*pasz+pasy_y*j+precision>mousePos.y))
						{
							canvas.style.cursor='pointer';
							context.drawImage(img, Ox+i*pasx+pasy_x*j-7, Oy+k*pasz+pasy_y*j-7);
							if (aide==1)
							{
								correction(context,i,j,k);
							}
						}
					}
				}
			}
		}
	}	
}, false);

canvas.addEventListener('click', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	posx=Ox+coorx*pasx+pasy_x*coory;
	posy=Oy+coory*pasy_y+pasz*coorz;
	if (fige==0)
	{
		for (var i = 0; i < decoupex+1; i++) 
		{
			for (var j = 0; j < decoupey+1; j++) 
			{
					for (var k = 0; k < decoupez+1; k++) 
				{
					if ((Ox+i*pasx+pasy_x*j-precision<mousePos.x)&&(Ox+i*pasx+pasy_x*j+precision>mousePos.x))
					{
						if ((Oy+k*pasz+pasy_y*j-precision<mousePos.y)&&(Oy+k*pasz+pasy_y*j+precision>mousePos.y))
						{
							if (((posy-precision<mousePos.y)&&(posy+precision>mousePos.y))&&((posx-precision<mousePos.x)&&(posx+precision>mousePos.x)))
							{
								clearCanvas(context, canvas,decoupex,decoupey,decoupez);
								correction(context,coorx,coory,coorz);
								ecritlettre(context,"H",posx,posy);
								context.drawImage(img,posx-7, posy-7);
								ecritcorrection('BRAVO !! Tu as trouvé le point H de coordonnées('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+';'+affichenombreavecvirgule(mathcoorz)+')',true);
							}
							else
							{
								clearCanvas(context, canvas,decoupex,decoupey,decoupez);
								correction(context,coorx,coory,coorz);
								ecritlettre(context,"H",posx,posy);
								context.drawImage(img, posx-7, posy-7);							
								ecritcorrection('NON !!!!! Tu n as pas trouvé le point H de coordonnées('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+';'+affichenombreavecvirgule(mathcoorz)+')',false);
							}
							fige=1;
							desactivebouton(true);
							setTimeout(function() {
								fige=0;desactivebouton(false);initialisation();
								}, 4000);
								
						}
					}
				}
			}
		}	
	}
},false);	  

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
	dessinepave(context,Ox,Oy,Ax,Ay,Bx,By,Cx,Cy,decoupex,decoupey,decoupez);   
	positionnelettreH(context,coorx,coory,coorz);
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
	context.font = "18pt Calibri,Geneva,Arial";
	context.fillText(lettre,x+8,y+20);
}

function dessinepave(context,Ox,Oy,Ax,Ay,Bx,By,Cx,Cy,decoupex,decoupey,decoupez)	
{
	context.beginPath();//On démarre un nouveau trace
	context.setLineDash([0]);
	Gx=Cx+Bx-Ox;
	Gy=Cy+By-Oy;
	Fx=Cx+Bx-Ox+Ax-Ox;
	Fy=Cy+By-Oy+Ay-Oy;
	Dx=Bx+Ax-Ox;
	Dy=By+Ay-Oy;
	Ex=Cx+Ax-Ox;
	Ey=Cy+Ay-Oy;
	pasx=(Bx-Ox)/decoupex;
	pasy_x=(Ax-Ox)/decoupey;
	pasy_y=(Ay-Oy)/decoupey;
	pasz=(Cy-Oy)/decoupez;
	Ix=Cx+echellex*pasx;
	Iy=Cy;
	Jx=Cx+echelley*pasy_x;
	Jy=Cy+echelley*pasy_y;
	Kx=Cx;
	Ky=Cy-echellez*pasz;//on remonte 
	if ((decoupez>1)&&((Ox!=Kx)||(Oy!=Ky)))
	{	
		ecritlettre(context,"C",Ox,Oy);// J'ai échangé C et O pour un repère plus usuel.
	}
	ecritlettre(context,"A",Ax,Ay);
	ecritlettre(context,"B",Bx,By);
	ecritlettre(context,"O",Cx,Cy);// J'ai échangé C et O pour un repère plus usuel.
	ecritlettre(context,"D",Dx,Dy);
	if ((decoupey>1)&&((Ex!=Jx)||(Ey!=Jy)))
	{	
		ecritlettre(context,"E",Ex,Ey);
	}
	ecritlettre(context,"F",Fx,Fy);
	if ((decoupex>1)&&((Gx!=Ix)||(Gy!=Iy)))
	{	
		ecritlettre(context,"G",Gx,Gy);
	}
	context.moveTo(Ox,Oy);//On se déplace au coin inferieur gauche
	context.lineTo(Bx,By);
	context.moveTo(Ox,Oy);
	context.lineTo(Ax,Ay);
	context.moveTo(Ox,Oy);
	context.lineTo(Cx,Cy);
	context.lineTo(Gx,Gy);
	context.lineTo(Bx,By);
	context.moveTo(Gx,Gy);
	context.lineTo(Fx,Fy);
	context.lineTo(Dx,Dy);
	context.lineTo(Bx,By);
	context.moveTo(Ax,Ay);
	context.lineTo(Dx,Dy);
	context.stroke();//On trace seulement les lignes pleines
	context.closePath();
	
	context.beginPath();//On démarre un nouveau trace
	context.setLineDash([5]);
	context.moveTo(Ax,Ay);
	context.lineTo(Ex,Ey);
	context.lineTo(Cx,Cy);
	context.moveTo(Ex,Ey);
	context.lineTo(Fx,Fy);
	context.stroke();//On trace seulement les lignes en pointillées
	context.closePath();
	//    A    D
	// O     B
	//      
	//    E    F
	// C    G
	context.beginPath();//On démarre un nouveau trace
	context.setLineDash([0]);
	for (var i = 1; i < decoupex+1; i++) 
	{
		context.moveTo(Cx+pasx*i,Cy);
		context.lineTo(Ox+pasx*i,Oy);
		context.lineTo(Ax+pasx*i,Ay);
	}
	context.stroke();
	context.closePath();

	context.beginPath();//On démarre un nouveau trace
	context.setLineDash([5]);
	for (var i = 1; i < decoupex; i++) 
	{
		context.moveTo(Cx+pasx*i,Cy);
		context.lineTo(Ex+pasx*i,Ey);
		context.lineTo(Ax+pasx*i,Ay);
	}
	context.stroke();
	context.closePath();

	//découpe verticale	
	context.beginPath();//On démarre un nouveau trace
	context.setLineDash([0]);
	for (var i = 1; i < decoupey; i++) 
	{
		context.moveTo(Ox+pasy_x*i,Oy+pasy_y*i);
		context.lineTo(Bx+pasy_x*i,By+pasy_y*i);
		context.lineTo(Gx+pasy_x*i,Gy+pasy_y*i);
	}
	context.stroke();
	context.closePath();

	context.beginPath();//On démarre un nouveau trace
	context.setLineDash([5]);
	for (var i = 1; i < decoupey; i++) 
	{
		context.moveTo(Gx+pasy_x*i,Gy+pasy_y*i);
		context.lineTo(Cx+pasy_x*i,Cy+pasy_y*i);
		context.lineTo(Ox+pasy_x*i,Oy+pasy_y*i);
		for (var j = 1; j < decoupex; j++) 
		{
			context.moveTo(Ox+pasx*j+pasy_x*i,Oy+pasy_y*i);
			context.lineTo(Cx+pasx*j+pasy_x*i,Cy+pasy_y*i);
		}
	}
	context.stroke();
	context.closePath();

	//découpe horizontale	
	context.beginPath();//On démarre un nouveau trace
	context.setLineDash([0]);
	for (var i = 1; i < decoupez; i++) 
	{
		context.moveTo(Ox,Oy+pasz*i);
		context.lineTo(Bx,By+pasz*i);
		context.lineTo(Dx,Dy+pasz*i);
	}
	context.stroke();
	context.closePath();
	
	context.beginPath();//On démarre un nouveau trace
	context.setLineDash([5]);
	for (var i = 1; i < decoupez; i++) 
	{
		context.moveTo(Ox,Oy+pasz*i);
		context.lineTo(Ax,Ay+pasz*i);
		context.lineTo(Dx,Dy+pasz*i);
		for (var j = 1; j < decoupey; j++) 
		{
			context.moveTo(Ox+pasy_x*j,Oy+pasz*i+pasy_y*j);
			context.lineTo(Bx+pasy_x*j,By+pasz*i+pasy_y*j);
		}
	}
	context.stroke();
	//placer les lettres du repère
	ecritlettre(context,"I",Ix,Iy);
	ecritlettre(context,"J",Jx,Jy);
	ecritlettre(context,"K",Kx,Ky);
	context.closePath();
}

function positionnelettreH(context,coorx,coory,coorz)
{
	context.beginPath();//On démarre un nouveau trace
	pasx=(Bx-Ox)/decoupex;
	pasy_x=(Ax-Ox)/decoupey;
	pasy_y=(Ay-Oy)/decoupey;
	pasz=(Cy-Oy)/decoupez;
	//posx=Ox+coorx*pasx+pasy_x*coory;
	//posy=Oy+coory*pasy_y+pasz*coorz;
	mathcoorx=coorx/echellex;
	mathcoory=coory/echelley;
	mathcoorz=(decoupez-coorz)/echellez;
	//ecritlettre(context,"H",posx,posy);
	ecritconsigne('Dans le repère (O;I,J,K), placer le point H de coordonnées ('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+';'+affichenombreavecvirgule(mathcoorz)+')');
	//alert(mathcoorx+' '+mathcoory+' '+mathcoorz);
	context.closePath();
}
