var attacks = new Array();
var xp = 0;
if(localStorage.attacks){
		attacks = JSON.parse(localStorage.attacks);
	}
$(document).ready(function(){
	// Modal
	$('#addAttack').click(function(){
		$('body').css({'overflow': 'hidden'});
		$('#newattack').fadeIn();
	});
	$('.cover').click(function(){
		$('body').css({'overflow': 'visible'});
		closeModal('#newattack');
	});

	// Add dice
	$('#addDice').click(function(e){
		e.preventDefault();
		$('#dices').append('<select class="medium-span6 column" name="dice"><option value="20">D20</option><option value="12">D12</option><option value="10">D10</option><option value="8">D8</option><option value="6">D6</option><option value="4">D4</option></select>');
	});

	// Add attack
	$('#addAttackSub').click(function(e){
		e.preventDefault();
		var data = $('#newattackform').serializeArray();

		var newattack = {
			name: "",
			type: "",
			mod: "",
			dices: new Array(),
			desc: "",
		}
		data.forEach(function(part){
			if(part.name == 'name'){
				newattack.name = part.value;
			}
			if(part.name == 'type'){
				newattack.type = part.value;
			}
			if(part.name == 'mod'){
				newattack.mod = part.value;
			}
			if(part.name == 'desc'){
				newattack.desc = part.value;
			}
			if(part.name == 'dice'){
				newattack.dices.push(part.value);
			}
		});
		attacks.push(newattack);
		localStorage.attacks = JSON.stringify(attacks);
		$('body').css({'overflow': 'visible'});
		closeModal('#newattack');
		$('#newattackform')[0].reset();
		$('#dices').html('<select class="medium-span6 column" name="dice"><option value="20">D20</option><option value="12">D12</option><option value="10">D10</option><option value="8">D8</option><option value="6">D6</option><option value="4">D4</option></select>');
		renderAttacks();
	});	
	renderAttacks();

	// XP
	if(localStorage.xp){
		xp = parseInt(localStorage.xp);
	}else{
		xp = 0;
	}
	$('#totalxp').append(xp);

	$('#updateXP').click(function(e){
		e.preventDefault();
		var newxp = parseInt($('#xpfield').val());
		if(newxp){
			xp += newxp;
			localStorage.xp = xp;
			$('#totalxp').html('Total XP: ' + xp);
		}
	});
});
var closeModal = function(el){
	$(el).fadeOut();
}
var renderAttacks = function(){
	$('#attackslist').html('<div class="medium-span12 column"><span class="medium-span4 column"><strong>Attackname</strong></span><span class="medium-span2 column"><strong>Type</strong></span><span class="medium-span2 column"><strong>Short desc</strong></span><div class="small-span6 medium-span2"><button class="btn warning" style="width: 100%;" id="newEncounter">Encounter</button></div><div class="small-span6 medium-span2 column"><button class="btn alert" style="width: 100%;" id="newDaily">Reset Daily</button></div></div><hr>');
	if(attacks){
		var i = 0;
		attacks.forEach(function(attack){
			$('#attackslist').append('<div class="medium-span12 column"><span onclick="useAttack('+i+');" class="medium-span4 column">'+attack.name+'</span><span class="medium-span2 column">'+attack.type+'</span><span class="medium-span4 column">'+attack.desc+'</span><div class="medium-span2 column"><button onclick="removeAttack('+i+');" class="btn alert text-center">remove</button></div></div>');
			i++;
		});
	}
}
var removeAttack = function(id){
	attacks.splice(id, 1);
	localStorage.attacks = JSON.stringify(attacks);
	renderAttacks();
}

var useAttack = function(id){
	var attack = attacks[id];
	var totalDmg = 0;
	if(isNaN(attack.mod)){
		totalDmg = 0;
	}else{
		totalDmg = parseInt(attack.mod);
	}
	attack.dices.forEach(function(dice){
		totalDmg += Math.round((Math.random()*(dice-1))+1);
	});
	alert('Damage: '+totalDmg);
}