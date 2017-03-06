var names = Object.keys(logins);
var matieres=Object.keys(votes[names[0]]);
var vote_global = {};
var Entropie = {};

function nbr_vote_total(matiere) {
	var nbr_de_vote_total=0;
	var mat_obj = vote_global[matiere];
	for(one in mat_obj) {
		nbr_de_vote_total += mat_obj[one];
	}
	return nbr_de_vote_total;
}


function calcul_nbr_vote(name, matiere) {

	var nbr_de_vote=0;
	//for(var i=0;i<length(votes);i++) {
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
			for(name in names) {
				name_tmp=names[name];
		//console.log(nam,mati);
		vote_global[mati][name_tmp]= calcul_nbr_vote(name_tmp,mati, false);

	}
	vote_global[matieres[matiere]]["total"]=nbr_vote_total(matieres[matiere]);
}
}



function createMyTable() {
	$( "#data" ).append("<table id='tablo' class='table table-striped'>");
	$("#tablo").append("<thead>");
	$("#tablo").append("<tbody>");
	$("#tablo > thead").append("<th>");
	$("#tablo > thead").append("<th>");

	for(var i = 0, len = matieres.length; i < len; i++)
		$("#tablo > thead").append("<th>" + matieres[i] + "</th>");

	for(var i = 0, len = names.length; i < len; i++) {
		$("#tablo > tbody").append("<tr id="+names[i]+"><td>" + names[i] + "</td><td><button class='profil btn btn-default' type='button'> profil</button></td></tr>");

		for(var j = 0, leng = matieres.length; j < leng; j++) {
			$("#"+names[i]+"").append("<td>"+vote_global[matieres[j]][names[i]]+"</td>");
		}
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


	$('.profil').click(function(e){
		$('#lol').remove();
		var $data=$(this).closest("tr").attr("id");
		$('#name').text($data);
		$('#profile').append("<div id='lol'>");
		for(var i = 0, len = matieres.length; i < len; i++) {
			$("#lol").append("<table class='table-striped'><thead><th>"+matieres[i]+"</th></thead><tbody id="+i+"></tbody></table>");
			//$("#profile").append("<div id="+i+">"+matieres[i]+"</div>");
			for(var j = 0, leng = votes[$data][matieres[i]].length; j < leng; j++) {

				var value = Math.round(- Math.log(vote_global[matieres[i]][votes[$data][matieres[i]][j]])*100)/100;
				
				if(value<=2){
					color="green";
				}
				else if(value>2 && value<3){
					color="orange";
				}
				else if(value>=3){
					color="red";
				}
				$("#"+i+"").append("<tr><td>"+votes[$data][matieres[i]][j]+" : "+"<p style=color:"+color+">"+value+"</p></td></tr>");

			}
		}

	});

	

});



console.log(vote_global);
console.log(votes);
console.log(names);
console.log(logins)
console.log(matieres);