<?php

//open connection
$mysqlConn = new mysqli("localhost", "root", "MomLink_Root99", "momlink"); 
if($mysqlConn->connect_error) {
	die("Connection failed: " . $mysqlConn->connect_error);
}


$result = $mysqlConn->query("SELECT * FROM referral_category WHERE agency = 3");
	if ($result->num_rows > 0){
		while($row = mysqli_fetch_assoc($result)) {
			$id = $row['category_id'];
			$cat_label = $row['category_label'];
			$ranking = $row['ranking'];
			$image = $row['image'];
			$description = $row['description'];		
			$mysqlConn->query("INSERT INTO referral_category (category_label, agency, ranking, image, description) VALUES ('$cat_label', 8, '$ranking', '$image', '$description')");

			$last_id = $mysqlConn->insert_id;
			$referral = $mysqlConn->query("SELECT * FROM referrals WHERE rtype = $id");
			if ($referral->num_rows > 0){
				while($referralRow = mysqli_fetch_assoc($referral)) {
					$rName = $referralRow['name'];	
					$rAddress = $referralRow['address'];	
					$rPhone = $referralRow['phone'];	
					$rPhone2 = $referralRow['phone2'];	
					$rEmail = $referralRow['email'];	
					$rUrl = $referralRow['url'];	
					$rDescription = $referralRow['description'];	
					$rHours = $referralRow['hours'];
					$rFax = $referralRow['fax'];	
					$rCounty = $referralRow['county'];	
					$rCounty = !empty($rCounty) ? "'$rCounty'" : "NULL";
					$rImage_path = $referralRow['image_path'];	
					$response = $mysqlConn->query("INSERT INTO referrals (rtype, name, address, phone, phone2, email, url, description, hours, fax, county, agency, image_path) VALUES ($last_id, '$rName', '$rAddress', '$rPhone', '$rPhone2', '$rEmail', '$rUrl', '$rDescription', '$rHours', '$rFax', $rCounty, 8, '$rImage_path')");
				}
			}
		}
	}


$result = $mysqlConn->query("SELECT * FROM topics WHERE agency = 5");
	if ($result->num_rows > 0){
		while($row = mysqli_fetch_assoc($result)) {
			$id = $row['id'];
			$title = $row['title'];
			$image = $row['image'];
			$ranking = $row['ranking'];
			$description = $row['description'];		
			$mysqlConn->query("INSERT INTO topics (title, image, agency, ranking, description) VALUES ('$title', '$image', 8, '$ranking', '$description')");

			$last_id = $mysqlConn->insert_id;
			$content = $mysqlConn->query("SELECT * FROM content WHERE topic = $id");
			if ($content->num_rows > 0){
				while($contentRow = mysqli_fetch_assoc($content)) {
					$cTitle = $contentRow['title'];	
					$cPath = $contentRow['path'];	
					$cUpload_date = $contentRow['upload_date'];
					$cUploader = $contentRow['uploader'];
					$cUploader = !empty($cUploader) ? "'$cUploader'" : "NULL";
					$cDescription = $contentRow['description'];	
					$cFilename = $contentRow['filename'];	
					$cQuiz = $contentRow['quiz'];
					$cQuiz = !empty($cQuiz) ? "'$cQuiz'" : "NULL";
					$response = $mysqlConn->query("INSERT INTO content (title, path, topic, upload_date, uploader, description, filename, quiz) VALUES ('$cTitle', '$cPath', '$last_id', '$cUpload_date', 10015, '$cDescription', '$cFilename', $cQuiz)");
				}
			}
		}
	}