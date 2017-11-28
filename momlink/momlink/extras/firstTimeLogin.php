<?php

$response = array();
$result = '';

//checks that variable is not null
if(!empty($_POST['username'])) {
	//open connection
	$mysqlConn = new mysqli("localhost", "root", "MomLink_Root99", "momlink"); 
	if($mysqlConn->connect_error) {
		die("Connection failed: " . $mysqlConn->connect_error);
	}

	//escape strings
	$usr = $mysqlConn->real_escape_string($_POST['username']);
	$pass = $mysqlConn->real_escape_string($_POST['password']);
	$token = $mysqlConn->real_escape_string($_POST['token']);

	//sql query
	$result = $mysqlConn->query("SELECT login.client_id, login.agency, login.sec_question, encounters.pncc_id, client.firstname, client.lastname, client.dob, client.triage_level, medical.edc FROM login INNER JOIN encounters ON login.client_id = encounters.client_id INNER JOIN medical ON login.client_id = medical.client_id INNER JOIN client ON login.client_id = client.id WHERE login.username='$usr' AND login.password='$pass'"); 
	//$result = $mysqlConn->query("SELECT client_id, agency, sec_question FROM login WHERE username='$usr' AND password='$pass'");
	
	if ($result->num_rows > 0){
		$response[] = array('message'=>'Login Information Transferred.', 'success'=>1);
		$response[] = mysqli_fetch_array($result);

		$cid = $response[1]['client_id'];
		$secQ = $response[1]['sec_question'];
		
		$securityText = $mysqlConn->query("SELECT question FROM security_question WHERE id = '$secQ'");
		if ($securityText->num_rows > 0){
			$secQ1[] = mysqli_fetch_array($securityText);
		}
		
		$response[1]['sec_question'] = $secQ1[0]['question'];		

		$result7 = $mysqlConn->query("UPDATE login SET token = '$token' WHERE client_id = '$cid'"); 
		//$mysqlConn->query("INSERT INTO client_trackers (client_id) VALUES ('$cid')");
	}
	else{
		$response[] = array('message'=>'Client Does Not Exist', 'success'=> 0); 
	}

}
else {
	$response[] = array('message'=>'No Username Provided', 'success'=>0);  
}
echo json_encode($response); 

