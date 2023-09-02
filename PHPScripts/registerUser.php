<?php 
    header('Access-Control-Allow-Origin: *');
     
    $conn = new mysqli("localhost","root","","tatersdb");
     
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $username = $_POST['username'];
        $firstName = $_POST['fname'];
        $lastName = $_POST['lname'];
        $address = $_POST['saddress'];
        $municipalityId = $_POST['selectedMunicipality'];
        $barangayId = $_POST['selectedBarangay'];
        $age = $_POST['age'];
        $gender = $_POST['selectedGender'];
        $email = $_POST['email'];
        $password = NULL;
         
        $sql = "INSERT INTO users (username, first_name, last_name, saddress, municipality_id, barangay_id, age, gender, email, password)
        VALUES ('$username', '$firstName', '$lastName', '$address', '$municipalityId', '$barangayId', '$age', '$gender', '$email', NULL)";
        $res = mysqli_query($conn, $sql);
         
        if($res){
            echo "Success!";
        }
        else{
            echo "Error!";
        }
        $conn->close();
    }
?>