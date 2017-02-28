
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



	var names = Object.keys(votes);
	var matieres=Object.keys(votes[names[0]]);
	console.log(votes);
	console.log(names);
	console.log(matieres);

	var vote_global = {};
	for(matiere in matieres) {
		var mati=matieres[matiere];
		vote_global[mati] = {} ;
		for(name in names) {
			name_tmp=names[name];
		//console.log(nam,mati);
		vote_global[mati][name_tmp]= calcul_nbr_vote(name_tmp,mati);

	}
	vote_global[matieres[matiere]]["total"]=nbr_vote_total(matieres[matiere]);
}


	for(matiere in matieres) {
		var mati=matieres[matiere];
		for(name in names) {
			name_tmp=names[name];
		vote_global[mati][name_tmp]= vote_global[mati][name_tmp]/vote_global[mati]["total"];

	}
}




console.log(vote_global);