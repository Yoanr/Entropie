var names = Object.keys(logins);
var matieres=Object.keys(votes[names[0]]);
var vote_global = {};
var vote_global_old = {};
var Entropie = new Array();
var ScoreGlobal = new Array();
var ScoreGloball = {};
var objecto = {};
var objectou = {};
var dataa={};
var mati={"ACDA":"ACDA","ANG":"Anglais","APL":"APL","ART":"ART","EC":"EC","EGOD":"EGOD","MAT":"MATH","SGBD":"SGBD","SPORT":"SPORT"}


var Data_vote_total = new Array();
var Data_vote_name  = new Array();
var Data_vote_Entropie = new Array();

function afficher_graph(name_here) {
	Data_vote_total = new Array();
	Data_vote_name  = new Array();
	Data_vote_Entropie = new Array();

	if(votes[name_here]) {
		for(var i = 0, len = matieres.length; i < len; i++) {
			for(var j = 0, leng = votes[name_here][matieres[i]].length; j < leng; j++) {
				Data_vote_total.push(vote_global_old[matieres[i]][votes[name_here][matieres[i]][j]]);
				var str= votes[name_here][matieres[i]][j]+" "+matieres[i];
				Data_vote_name.push(str);
				value=Math.round(- Math.log(vote_global[matieres[i]][votes[name_here][matieres[i]][j]])*100)/100;
				Data_vote_Entropie.push(value);

			}
		}
	}

	Highcharts.chart('container', {
		chart: {
			zoomType: 'xy'
		},
		title: {
			text: 'Analyse des votes de \"'+logins[name_here]+'\"'
		},
		subtitle: {
			text: 'Source: http://www.iut-fbleau.fr/projet/maths/'
		},
		xAxis: [{
			categories: Data_vote_name,
			crosshair: true
		}],
    yAxis: [{ // Primary yAxis
    	labels: {
    		format: '{value}',
    		style: {
    			color: Highcharts.getOptions().colors[1]
    		}
    	},
    	title: {
    		text: 'Entropie',
    		style: {
    			color: Highcharts.getOptions().colors[1]
    		}
    	}
    }, { // Secondary yAxis
    	title: {
    		text: 'Votes',
    		style: {
    			color: Highcharts.getOptions().colors[0]
    		}
    	},
    	labels: {
    		format: '{value} vote(s)',
    		style: {
    			color: Highcharts.getOptions().colors[0]
    		}
    	},
    	opposite: true
    }],
    tooltip: {
    	shared: true
    },
    legend: {
    	layout: 'vertical',
    	align: 'left',
    	x: 120,
    	verticalAlign: 'top',
    	y: 100,
    	floating: true,
    	backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
    	name: 'Votes',
    	type: 'column',
    	yAxis: 1,
    	data: Data_vote_total,
    	tooltip: {
    		valueSuffix: ' vote(s) aux total'
    	}

    }, {
    	name: 'Entropie',
    	type: 'spline',
    	data: Data_vote_Entropie,
    	tooltip: {
    		valueSuffix: ''
    	}
    }]
});
}

function nbr_vote_total(matiere) {
	var nbr_de_vote_total=0;
	var mat_obj = vote_global[matiere];
	for(one in mat_obj) {
		nbr_de_vote_total += mat_obj[one];
	}
	return nbr_de_vote_total;
}

function classement() {

	$('#classement').append("<p>Classement Global de sérieux<p>").css('font-size','30px');
	$('#classement').append("<table class='table table-striped table-bordered table-hover'><tbody id='tablo_classement'></tbody></table>");
	$('#classement').css('border-style','solid');
	$('#classement').css('background-color','#A9E2F3');
	var placement =1;
	for(ScoreGloba in ScoreGlobal) {

		if(ScoreGlobal[ScoreGloba].score<=1.5){
			color="#309DBA";
		}else if(ScoreGlobal[ScoreGloba].score>1.5 && ScoreGlobal[ScoreGloba].score<=2.7){
			color="green";
		}
		else if(ScoreGlobal[ScoreGloba].score>2.7 && ScoreGlobal[ScoreGloba].score<3){
			color="orange";
		}
		else if(ScoreGlobal[ScoreGloba].score>3 && ScoreGlobal[ScoreGloba].score<3.5) {
			color= "#FB7D1A";
		}
		else if(ScoreGlobal[ScoreGloba].score>=3.5){
			color="red";
		}
		str="<tr><td>"+placement+"/"+ScoreGlobal.length+"</td><td>"+logins[ScoreGlobal[ScoreGloba].name]+"</td><td style='color:"+color+"'><b>"+ScoreGlobal[ScoreGloba].score+"</b></td></tr>"
		$('#tablo_classement').append(str);
		placement++;
	}
	
}

function Data_Individuel() {
	var value=0;
	//TODO : initialiser Entropie
	for(var u = 0, le=names.length;u<le;u++) {
		if(votes[names[u]]) {
			for(var i = 0, len = matieres.length; i < len; i++) {
				for(var j = 0, leng = votes[names[u]][matieres[i]].length; j < leng; j++) {

					value=Math.round(- Math.log(vote_global[matieres[i]][votes[names[u]][matieres[i]][j]])*100)/100;
					//Entropie[names[u]]/*[matieres[i]]*/ = Math.round(- Math.log(vote_global[matieres[i]][votes[names[u]][matieres[i]][j]])*100)/100;
					//Entropie[u][i][j] = Math.round(- Math.log(vote_global[matieres[i]][votes[names[u]][matieres[i]][j]])*100)/100;
					objectou = {'name':names[u],'score':value,'matiere':matieres[i],'global':vote_global_old[matieres[i]][names[u]]};
					Entropie.push(objectou);
				}
			}
		}
	}
}

function Data_Total() {
	var longueur=0;
	var values=0;
	var moyenne=0;
	var value=0;

	for(var u = 0, le = names.length;u < le ;u++) {
		moyenne=0;
		values=0;
		longueur=0;
		if(votes[names[u]]) {		
			for(var i = 0, len = matieres.length; i < len; i++) {

				for(var j = 0, leng = votes[names[u]][matieres[i]].length; j < leng; j++) {
					longueur++;
					value= Math.round(- Math.log(vote_global[matieres[i]][votes[names[u]][matieres[i]][j]])*100)/100;
					values+=value;
				}
			}
			moyenne = Math.round(values/longueur*100)/100;
			ScoreGloball[names[u]]=moyenne;
			objecto = {'name':names[u],'score':moyenne};
			ScoreGlobal.push(objecto);
		}
	}
	ScoreGlobal.sort(function(a,b){return a.score-b.score;})
}

function calcul_nbr_vote(name, matiere) {

	var nbr_de_vote=0;
	for(one in votes)  {
		var len = votes[one][matiere].length;
		for(i=0;i<len;i++) {
			if(votes[one][matiere][i]==name){
				nbr_de_vote++;
			}	
		}
	}
	return nbr_de_vote;
}





function updateData() {
	for(matiere in matieres) {
		var mati=matieres[matiere];
		vote_global[mati] = {} ;
		vote_global_old[mati] = {} ;
		for(name in names) {
			name_tmp=names[name];
			vote_global[mati][name_tmp]= calcul_nbr_vote(name_tmp,mati, false);
			vote_global_old[mati][name_tmp]= calcul_nbr_vote(name_tmp,mati, false);


		}
		vote_global[matieres[matiere]]["total"]=nbr_vote_total(matieres[matiere]);
		vote_global_old[matieres[matiere]]["total"]=nbr_vote_total(matieres[matiere])/2;
	}

}



function createMyTable() {
	$( "#data" ).append("<table id='tablo' class='table table-striped table-bordered table-hover'>");
	$("#tablo").append("<thead>");
	$("#tablo").append("<tbody>");
	//$("#tablo > thead").append("<th>");
	//$("#tablo > thead").append("<th>");

	for(var i = 0, len = matieres.length; i < len; i++)
	//$("#tablo > thead").append("<th>" + matieres[i] + "</th>");

for(var i = 0, len = names.length; i < len; i++) {
	var str="fa-users";
	if(!votes[names[i]]) {
		str="fa-times"
	}
	$("#tablo > tbody").append("<tr id="+names[i]+"><td>" + logins[names[i]] + "</td><td><a class='fa fa-arrow-circle-up' href='#'></a> <button class='profil btn btn-default fa "+str+"' type='button'></button></td></tr>");

		/*for(var j = 0, leng = matieres.length; j < leng; j++) {
			$("#"+names[i]+"").append("<td>"+vote_global[matieres[j]][names[i]]+"</td>");
		}*/
	}

}


function updateProba() {
	for(matiere in matieres) {
		var mati=matieres[matiere];
		for(name in names) {
			name_tmp=names[name];
			vote_global[mati][name_tmp]= vote_global[mati][name_tmp]/vote_global[mati]["total"];

		}
	}
}


$(document).ready(function () {

	updateData();
	createMyTable();
	updateProba();
	Data_Total();
	classement();
	Data_Individuel();
	$('#ACDA').click();
	for(matiere in matieres) {
		$('#matieres').append("<button class='choix btn btn-primary' id="+matieres[matiere]+">"+matieres[matiere]+"</button>");

	}


	$('#matieres').on('click', '.choix', function (e) {
		var Camenbert = new Array();
		var $matiere=$(this).attr("id");
		var objec;

		for(login in logins) {
			dataa= vote_global_old[$matiere][login];
			objec = {'name':login,'y':dataa};
			if(dataa!=0 || login!="total")
				Camenbert.push(objec);
		}
console.log(Camenbert);

		Highcharts.chart('container2', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'pourcentage des notes en '+mati[$matiere]+' par élèves'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.2f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				name: '% Votes',
				colorByPoint: true,
				data: Camenbert
			}]
		});
	});

$('.profil').click(function(e){
	$('#lol').remove();


	var values=0;
	var value=0;
	var longueur=0;

	var $data=$(this).closest("tr").attr("id");
	if(!votes[$data]) {
		console.log("mdr");
		$('#container').hide();
		return;
	} else {
		$('#container').show();
	}

	$('#profile').append("<div id='lol'>");
	$('#lol').css('border-style','solid');
	$('#lol').css('background-color','#A9E2F3');
	$('#lol').append("<p  style='font-size: 250%;' id='name'></p>");
	$('#name').text($data);
	$('#lol').append("<p style='font-size: 250%;'id='score'></p>");

	for(var i = 0, len = matieres.length; i < len; i++) {
		$("#lol").append("<table class='table-striped table-bordered table-hover'><thead><th>"+matieres[i]+"</th></thead><tbody class='tbodyentropie' id="+i+"></tbody></table>");
			//$("#profile").append("<div id="+i+">"+matieres[i]+"</div>");
			for(var j = 0, leng = votes[$data][matieres[i]].length; j < leng; j++) {

				value = Math.round(- Math.log(vote_global[matieres[i]][votes[$data][matieres[i]][j]])*100)/100;
				if(value<=1.5){
					color="#309DBA";
				}else if(value>1.5 && value<=2.7){
					color="green";
				}
				else if(value>2.7 && value<3){
					color="orange";
				}
				else if(value>3 && value<3.5) {
					color= "#FB7D1A";
				}
				else if(value>=3.5){
					color="red";
				}

				$("#"+i+"").append("<tr><td>"+votes[$data][matieres[i]][j]+" : "+"<p style=color:"+color+"><b>"+value+"</b></p></td></tr>");
			}
		}
		$("#tbodyentropie").css('border-style','solid');
		var moyenne =ScoreGloball[$data]; 
		 //Math.round(values/longueur*100)/100;
		 if(moyenne<=1.5){
		 	color="#309DBA";
		 }else if(moyenne>1.5 && moyenne<=2.7){
		 	color="green";
		 }
		 else if(moyenne>2.7 && moyenne<3){
		 	color="orange";
		 }
		 else if(moyenne>3 && moyenne<3.5) {
		 	color= "#FB7D1A";
		 }
		 else if(moyenne>=3.5){
		 	color="red";
		 }


		 $('#score').text("score :"+moyenne || " ").css('color',color);
		 afficher_graph($data);

		});



});

