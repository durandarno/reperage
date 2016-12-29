window.onload = initialisationimage();
fige=0; // on peut selectionner les points du pavé. sinon, c'est figé, et donc on ne peut pas cliquer
difficulte=0;
aide=0;
nbquestion=0;
epreuve='droite';
bonnereponse_droite=0;
bonnereponse_plan=0;
bonnereponse_espace=0;

  miseajourfonction();
//fonction generale
function affichescore()
{
	if (nbquestion<10)
	{
		document.getElementById('score_droite').style.boxShadow="0px 0px 20px #DAB30A";
 		document.getElementById('score_plan').style.boxShadow="0px 0px 0px #DAB30A";
		document.getElementById('score_espace').style.boxShadow="0px 0px 0px #DAB30A";
	}
	else if(nbquestion<20)
	{
		document.getElementById('score_plan').style.boxShadow="0px 0px 20px #DAB30A";
 		document.getElementById('score_droite').style.boxShadow="0px 0px 0px #DAB30A";
		document.getElementById('score_espace').style.boxShadow="0px 0px 0px #DAB30A";
	}
	else
	{
		document.getElementById('score_espace').style.boxShadow="0px 0px 20px #DAB30A";
 		document.getElementById('score_plan').style.boxShadow="0px 0px 0px #DAB30A";
		document.getElementById('score_droite').style.boxShadow="0px 0px 0px #DAB30A";		
	}
	document.getElementById('score_droite').value=bonnereponse_droite;
	if (bonnereponse_droite<6)
	{
		document.getElementById('score_droite').style.backgroundColor='rgb('+250+','+bonnereponse_droite*25+',0)';
	}
	else
	{
		document.getElementById('score_droite').style.backgroundColor='rgb('+(5-(bonnereponse_droite-5))*50+','+bonnereponse_droite*25+',0)';

	}
	document.getElementById('score_plan').value=bonnereponse_plan;
	if (bonnereponse_plan<6)
	{
		document.getElementById('score_plan').style.backgroundColor='rgb('+250+','+bonnereponse_plan*25+',0)';
	}
	else
	{
		document.getElementById('score_plan').style.backgroundColor='rgb('+(5-(bonnereponse_plan-5))*50+','+bonnereponse_plan*25+',0)';

	}
	document.getElementById('score_espace').value=bonnereponse_espace;
	if (bonnereponse_espace<6)
	{
		document.getElementById('score_espace').style.backgroundColor='rgb('+250+','+bonnereponse_espace*25+',0)';
	}
	else
	{
		document.getElementById('score_espace').style.backgroundColor='rgb('+(5-(bonnereponse_espace-5))*50+','+bonnereponse_espace*25+',0)';

	}
}
function afficheresultat()
{
	affichescore();
	if ((bonnereponse_droite>6)&&(bonnereponse_plan>6)&&(bonnereponse_espace>6))
	{
		conseils="Bravo! Tu as passé ton permis avec succès!!";
	}
	else
	{
		bool=false;
		conseils="Oh! Dommage! Il te faut encore travailler davantage";
		if (bonnereponse_droite<7)
		{
			conseils+=" le repérage sur une droite graduée"
			bool=true;
		}
		if (bonnereponse_plan<7)
		{
			if (bool)
			{
				if (bonnereponse_espace<7)
				{
					conseils+=", dans un plan et dans l\'espace."
				}
				else
				{
					conseils+="et dans un plan."
				}
			}
			else
			{
				if (bonnereponse_espace<7)
				{
					conseils+="le repérage dans un plan et dans l\'espace."
				}
				else
				{
					conseils+="le repérage dans un plan."
				}
			}
		}
	}
	document.getElementById('consigne').style.display='none';
	document.getElementById('resultat').style.display='';
	document.getElementById('resultat').innerHTML='Tu as eu les résultats suivants : <br/>Repérage sur une droite : '+bonnereponse_droite+'/10<br/>Repérage dans un plan : '+bonnereponse_plan+'/10<br/>Repérage dans l\'espace : '+bonnereponse_espace+'/10<br/><br/>'+conseils;
	
}
function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
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

function affichenombreavecvirgule(nombre)
{
	return nombre.toString().replace(".",",");
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
function arrondis100e(nb)
{
	return Math.round(nb*100)/100;
}
//droite




function initialisation_droite()
{
	affichescore();
	if (fige==0)
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
			positionnelettreH_droite(context,coorx);
			clearCanvas_droite(context, canvas,decoupex) ;
	}
}

function initialisationimage()
{
	 img = new Image();   // Crée un nouvel objet Image
	img.onload = function(){ 
		if (epreuve=='droite')
		{
			initialisation_droite();
		}
		else if(epreuve=='plan')
		{
			initialisation_plan();
		}
		else
		{
			initialisation_espace();
		}
	}
	img.src = './point.png'; // Définit le chemin vers sa source
}




  
  
  
function miseajourfonction()
{
	var canvas = document.getElementById('mon_canvas');
	var context = canvas.getContext('2d');
	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(canvas, evt);
	if (epreuve=='droite')
	{
		if (fige==0)
		{
		canvas.style.cursor='pointer';
		coordx_entier=arrondis100e(Math.round((mousePos.x-Ox)/((Ax-Ox)/(decoupex))));
		coordx_pas=arrondis100e(Math.round((mousePos.x-Ox-coordx_entier*((Ax-Ox)/decoupex))/((Ax-Ox)/(decoupex*pas)))*(1/pas));
		coordx=coordx_entier+coordx_pas;
		clearCanvas_droite(context, canvas,decoupex)

		if (aide==1)
		{
			correction_droite(context,Ox+(Ax-Ox)*coordx/decoupex);
		}
		context.drawImage(img, Ox+(Ax-Ox)*coordx/decoupex-7, Oy-7);		
		}
	}
	else if(epreuve=='plan')
	{
		if (fige==0)
		{
				canvas.style.cursor='pointer';
				coordx_entier=arrondis100e(Math.round((mousePos.x-Ox)/((Ax-Ox)/(decoupex))));
				coordx_pas=arrondis100e(Math.round((mousePos.x-Ox-coordx_entier*((Ax-Ox)/decoupex))/((Ax-Ox)/(decoupex*pas)))*(1/pas));
				coordx=coordx_entier+coordx_pas;
				coordy_entier=arrondis100e(Math.round((mousePos.y-Oy)/((By-Oy)/(decoupey))));
				coordy_pas=arrondis100e(Math.round((mousePos.y-Oy-coordy_entier*((By-Oy)/decoupey))/((By-Oy)/(decoupey*pas)))*(1/pas));
				coordy=coordy_entier+coordy_pas;
				clearCanvas_plan(context, canvas,decoupex,decoupey)

				if (aide==1)
				{
					correction_plan(context,Ox+(Ax-Ox)*coordx/decoupex,Oy+(By-Oy)*coordy/decoupey);
				}
				context.drawImage(img, Ox+(Ax-Ox)*coordx/decoupex-7, Oy+(By-Oy)*coordy/decoupey-7);		
		}
	}
	else
	{
	if (fige==0)
	{
		clearCanvas_espace(context, canvas,decoupex,decoupey,decoupez);
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
								correction_espace(context,i,j,k);
							}
						}
					}
				}
			}
		}
	}	
	}}
	, false);
			
	canvas.addEventListener('click', function(evt) 
	{
			nbquestion++;
	        var mousePos = getMousePos(canvas, evt);
			if (epreuve=='droite')
			{
				if (fige==0)
				{
					fige=1;
					posx=Ox+(Ax-Ox)*mathcoorx/decoupex;
			
					coordx_entier=arrondis100e(Math.round((mousePos.x-Ox)/((Ax-Ox)/(decoupex))));
					coordx_pas=arrondis100e(Math.round((mousePos.x-Ox-coordx_entier*((Ax-Ox)/decoupex))/((Ax-Ox)/(decoupex*pas)))*(1/pas));
					coordx=arrondis100e(coordx_entier+coordx_pas);
									
					if (coordx==mathcoorx)
					{
						if (difficulte==0)
						{
							ecritcorrection('BRAVO!! Tu as trouvé le point H('+affichenombreavecvirgule(mathcoorx)+') !',true);
							bonnereponse_droite++;
						}
						else
						{
							ecritcorrection('BRAVO!! Tu as trouvé le point H(<div class="fraction"><span class="fup">'+Math.round(mathcoorx*pas)+'</span><span class="bar">/</span><span class="fdn">'+pas+'</span></div>) !',true);
							bonnereponse_droite++;
						}
						
						ecritlettre_droite(context,"H",posx,Oy);
					}
					else
					{
						if (difficulte==0)
						{
							ecritcorrection('NON!!!!! Tu n\'as pas trouvé le point H('+affichenombreavecvirgule(mathcoorx)+') mais H('+affichenombreavecvirgule(coordx)+') !',false);
						}
						else
						{
							ecritcorrection('NON!!!!! Tu n\'as pas trouvé le point H(<div class="fraction"><span class="fup">'+Math.round(mathcoorx*pas)+'</span><span class="bar">/</span><span class="fdn">'+pas+'</span></div>) mais H(<div class="fraction"><span class="fup">'+Math.round(coordx*pas)+'</span><span class="bar">/</span><span class="fdn">'+pas+'</span></div>)',false);
						}
						
						
						correction_droite(context,posx);
						ecritlettre_droite(context,"H",posx,Oy);
						context.drawImage(img, posx-7,Oy-7);
					}
					setTimeout(function() 
					{
						fige=0;
						if (nbquestion==10)
						{
							epreuve='plan';
							difficulte=0;
							initialisation_plan();

						}
						else
						{
							if (nbquestion==5)
							{difficulte=1;}
							initialisation_droite();
						}
					}, 1000);
				}
			}
			else if (epreuve=='plan')
			{
				if (fige==0)
				{
					fige=1;
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
						ecritlettre_plan(context,"H",posx,posy);
						ecritcorrection('BRAVO Tu as trouvé le point H de coordonnées('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+')',true);
						bonnereponse_plan++;
					}
					else
					{
						ecritlettre_plan(context,"H",posx,posy);
						correction_plan(context,posx,posy);
						context.drawImage(img, posx-7, posy-7);
						ecritcorrection('NON!!!!! Tu n\'as pas trouvé le point H de coordonnées('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+') mais ('+affichenombreavecvirgule(coordx)+';'+affichenombreavecvirgule(coordy)+')',false);
					}
					setTimeout(function() {
						fige=0;
						if (nbquestion==20)
						{
							difficulte=0;
							epreuve='espace';
							initialisation_espace();
						}
						else
						{
							if (nbquestion==15)
							{difficulte=1;}
							initialisation_plan();
						}
					}, 1000);
				}	
			}
			else
			{
				precision=5;
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
											fige=1;
											clearCanvas_espace(context, canvas,decoupex,decoupey,decoupez);
											correction_espace(context,coorx,coory,coorz);
											ecritlettre_espace(context,"H",posx,posy);
											context.drawImage(img,posx-7, posy-7);
											ecritcorrection('BRAVO !! Tu as trouvé le point H de coordonnées('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+';'+affichenombreavecvirgule(mathcoorz)+')',true);
											bonnereponse_espace++;
										}
										else
										{
											fige=1;
											clearCanvas_espace(context, canvas,decoupex,decoupey,decoupez);
											correction_espace(context,coorx,coory,coorz);
											ecritlettre_espace(context,"H",posx,posy);
											context.drawImage(img, posx-7, posy-7);							
											ecritcorrection('NON !!!!! Tu n\'as pas trouvé le point H de coordonnées('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+';'+affichenombreavecvirgule(mathcoorz)+')',false);
										}
										setTimeout(function() {
											fige=0;
											if (nbquestion==30)
											{
												difficulte=0;
												epreuve='resultat';
												fige=1;
												afficheresultat();
											}
											else
											{
												if (nbquestion==25)
												{difficulte=1;}
												initialisation_espace();
											}
										}, 1000);
									}
								}
							}
						}
					}			
				}
			}
	},false);	
}
  
  
function correction_droite(context,x)
{
	context.setLineDash([5]);
	context.strokeStyle='red'; 
	context.lineWidth=2; 
	context.moveTo(Ox,Oy);//On se déplace au coin inferieur gauche
	context.lineTo(x,Oy);
	context.stroke(); 
}

function clearCanvas_droite(context, canvas,decoupex,decoupey,decoupez) {
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
	positionnelettreH_droite(context,coorx);
}

function ecritlettre_droite(context,lettre,x,y)
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

	
	ecritlettre_droite(context,"1",Ox+(Ax-Ox)/decoupex,Oy);	
	ecritlettre_droite(context,"O",Ox,Oy);	
	context.moveTo(Gx,Gy);
	context.lineTo(Ax,Ay);
	context.lineTo(Ax-7,Ay-7);
	context.moveTo(Ax,Ay);
	context.lineTo(Ax-7,Ay+7);
	context.stroke();//On trace seulement les lignes pleines
	context.closePath();
}



function positionnelettreH_droite(context,coorx)
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



//plan



 
function correction_plan(context,x,y)
{
	context.setLineDash([5]);
	context.strokeStyle='red'; 
	context.lineWidth=2; 
	context.moveTo(Ox,y);//On se déplace au coin inferieur gauche
	context.lineTo(x,y);
	context.lineTo(x,Oy);
	context.stroke(); 

}
function clearCanvas_plan(context, canvas,decoupex,decoupey,decoupez) {
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
       
	positionnelettreH_plan(context,coorx,coory);

}



function initialisation_plan()
{
	affichescore();
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
		Bx=Ox;
		By=7;
		Ax=canvas.width-7;
		Ay=Oy;


		decoupex = Math.floor(5+Math.random()*3)
		decoupey = Math.floor(4+Math.random()*2)
		tableau_pas=[2,4,10];
		pas=tableau_pas[Math.floor(Math.random()*tableau_pas.length)]
		signe=[-1,1]
		signex=signe[Math.floor(Math.random()*signe.length)]
		signey=signe[Math.floor(Math.random()*signe.length)]
		coorx = signex*Math.floor(Math.random()*(decoupex)) + arrondis100e(Math.floor(Math.random()*pas)/pas);
		
		coory = signey*Math.floor(Math.random()*(decoupey))+ arrondis100e(Math.floor(Math.random()*pas)/pas);
		clearCanvas_plan(context, canvas,decoupex,decoupey) ;
		dessineplan(context,Ox,Oy,Ax,Ay,Bx,By,decoupex,decoupey);
		positionnelettreH_plan(context,coorx,coory);
		clearCanvas_plan(context, canvas,decoupex,decoupey) ;
}


function ecritlettre_plan(context,lettre,x,y)
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
	ecritlettre_plan(context,"1",Ox,Oy+(By-Oy)/decoupey);	
	ecritlettre_plan(context,"1",Ox+(Ax-Ox)/decoupex,Oy);	
	
	ecritlettre_plan(context,"O",Ox,Oy);	

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


function positionnelettreH_plan(context,coorx,coory)
{
	context.beginPath();//On démarre un nouveau trace
	pasx=(Ax-Ox)/decoupex;
	pasx=(By-Oy)/decoupey;
	posx=Ox+coorx*pas;
	posy=Oy+coory*pas;
	mathcoorx=arrondis100e(coorx);
	mathcoory=arrondis100e(coory);
	//ecritlettre(context,"H",posx,posy);
	ecritconsigne('Dans le repère suivant, placer le point H de coordonnées ('+affichenombreavecvirgule(mathcoorx)+';'+affichenombreavecvirgule(mathcoory)+') :');
	//alert(mathcoorx+' '+mathcoory+' '+mathcoorz);
	context.closePath();
}

//reperage


function correction_espace(context,coorx,coory,coorz)
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
function initialisation_espace()
{
	affichescore();
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
	positionnelettreH_espace(context,coorx,coory,coorz);
	clearCanvas_espace(context, canvas,decoupex,decoupey,decoupez) ;
}





function clearCanvas_espace(context, canvas,decoupex,decoupey,decoupez) {
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
	positionnelettreH_espace(context,coorx,coory,coorz);
}


function ecritlettre_espace(context,lettre,x,y)
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
		ecritlettre_espace(context,"C",Ox,Oy);// J'ai échangé C et O pour un repère plus usuel.
	}
	ecritlettre_espace(context,"A",Ax,Ay);
	ecritlettre_espace(context,"B",Bx,By);
	ecritlettre_espace(context,"O",Cx,Cy);// J'ai échangé C et O pour un repère plus usuel.
	ecritlettre_espace(context,"D",Dx,Dy);
	if ((decoupey>1)&&((Ex!=Jx)||(Ey!=Jy)))
	{	
		ecritlettre_espace(context,"E",Ex,Ey);
	}
	ecritlettre_espace(context,"F",Fx,Fy);
	if ((decoupex>1)&&((Gx!=Ix)||(Gy!=Iy)))
	{	
		ecritlettre_espace(context,"G",Gx,Gy);
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
	ecritlettre_espace(context,"I",Ix,Iy);
	ecritlettre_espace(context,"J",Jx,Jy);
	ecritlettre_espace(context,"K",Kx,Ky);
	context.closePath();
}

function positionnelettreH_espace(context,coorx,coory,coorz)
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


//Cookies

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
