	
$(document).ready(function() {
	var tbody = document.getElementById('tbody');
	var tbody = document.getElementById('maxValue');
	var tbody = document.getElementById('tbody');

	function resultsToTable (obj){
		this.obj = obj
		
		let tr = ""

		let scores = obj.map((element) => parseFloat(element.Score))
		let maxScore = Math.max(...scores)
		let maxValueScores = obj.filter((element) => maxScore == parseFloat(element.Score))
		let maxValueScoresSorted = maxValueScores.sort((element1, element2) => parseFloat(element2.Score) - parseFloat(element1.Score)).reverse()

		tr += 
			"<tr>" + "Winners" + "</tr>" +
			"<tr>" + 
				"<th>" + "#" + "</th>" + 
				"<th>" + "Email" + "</th>" + 
				"<th>" + "Score" + "</th>" + 
				"<th>" + "Time diff(ms)" + "</th>" + 
			"</tr>"

		maxValueScoresSorted.forEach((element,index)=>{
			const dateDiff = new Date(element['Submit Date (UTC)'].toString()).getTime() - new Date(element['Start Date (UTC)'].toString()).getTime()
			if(element.Score == maxScore){
				tr +=
				"<tr>"+ 
					"<td>" + (index+1).toString() + "</td>" + 
					"<td>" + element['Email:'].toString() + "</td>" + 
					"<td>" + element.Score.toString() + "</td>" +
					"<td>" + dateDiff.toString() + "</td>" + 
				"</tr>";
			}			
		})

		tr += 
			"<tr>" + "All" + "</tr>" +
			"<tr>" + 
				"<th>" + "#" + "</th>" + 
				"<th>" + "Email" + "</th>" + 
				"<th>" + "Score" + "</th>" + 
				"<th>" + "Time diff(ms)" + "</th>" + 
			"</tr>"

		obj.forEach((eleemnt) =>  {
			const dateDiff = 
				new Date(eleemnt['Submit Date (UTC)'].toString()).getTime() - 
				new Date(eleemnt['Start Date (UTC)'].toString()).getTime()
			tr +=
				"<tr>"+ 
					"<th>" + "#" + "</th>" + 
					"<td>" + eleemnt['Email:'].toString() + "</td>" + 
					"<td>" + eleemnt.Score.toString() + "</td>" +
					"<td>" + dateDiff.toString() + "</td>" + 
				"</tr>";
		});
		tbody.innerHTML += tr;
	}
	
	//File Upload

	// Confirm browser supports HTML5 File API
	var browserSupportFileUpload = function() {
		var isCompatible = false;
		if(window.File && window.FileReader && window.FileList && window.Blob) {
			isCompatible = true;
		}
		return isCompatible;
	};

	// Upload selected file and create array
	var uploadFile = function(evt) {
		var file = evt.target.files[0];
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(event) {
			//Jquery.csv
			const results  = $.csv.toObjects(event.target.result)
			resultsToTable(results)
		};
	};

	// event listener for file upload
	if (browserSupportFileUpload()) {
			document.getElementById('txtFileUpload').addEventListener('change', uploadFile, false);
		} else {
			$("#introHeader").html('The File APIs is not fully supported in this browser. Please use another browser.');
		}	
});

