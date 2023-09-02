import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [municipalities, setMunicipalities] = useState([]);
    const [selectedMunicipality, setSelectedMunicipality] = useState('');
    const [barangays, setBarangays] = useState([]);
    const [selectedBarangay, setSelectedBarangay] = useState('');
    const [genders, setGenders] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    if(username.length === 0){
      alert("Username cant be Blank!");
    }
    else if(email.length === 0){
      alert("Email cant be Blank!");
    }
    else if(fname.length === 0){
      alert("First Name cant be Blank!");
    }
    else if(lname.length === 0){
      alert("Last Name cant be Blank!");
    }
    else if(address.length === 0){
      alert("Address cant be Blank!");
    }
    else if(age.length === 0){
      alert("Age cant be Blank!");
    }
    else if(selectedMunicipality.length === 0){
      alert("selectedMunicipality cant be Blank!");
    }
    else if(selectedBarangay.length === 0){
      alert("selectedBarangay cant be Blank!");
    }
    else if(selectedGender.length === 0){
      alert("selectedGender cant be Blank!");
    }
    else{
      const url = 'http://localhost/registerUser.php';
      let fData = new FormData();
      fData.append('username', username);
      fData.append('fname', fname);
      fData.append('lname', lname);
      fData.append('saddress', address);
      fData.append('selectedMunicipality', selectedMunicipality);
      fData.append('selectedBarangay', selectedBarangay);
      fData.append('selectedGender', selectedGender);
      fData.append('age', age);
      fData.append('email', email);
      axios.post(url, fData)
        .then((response) => {
            // Use the 'response' variable here
            sendEmailToUser(email);
            alert(response.data);
        })
        .catch((error) => {
            alert(error);
        });

    }
  }

        // Function to fetch genders from the server
    const fetchGenders = () => {
        axios.get('http://localhost/getGenders.php')
            .then(response => {
                setGenders(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Function to fetch barangays based on the selected municipality
    const fetchBarangays = (selectedMunicipality) => {
        // Construct the URL with the municipality_id as a query parameter
        const apiUrl = `http://localhost/getBarangays.php?municipality_id=${selectedMunicipality}`;
    
        // Make an HTTP GET request to the PHP script
        axios.get(apiUrl)
            .then(response => {
                setBarangays(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Function to send an email to the user
    const sendEmailToUser = (email) => {
    const emailUrl = 'http://localhost/sendEmail.php?email=recipient@example.com'; // Replace with your email sending endpoint
    const emailData = new FormData();
    emailData.append('email', email);
    axios
    .post(emailUrl, emailData)
    .then((response) => {
      console.log(response.data); // Log the email sending response
    })
    .catch((error) => {
      console.error(error);
    });
};

    useEffect(() => {
        // Make AJAX request to get the municipalities
        axios.get('http://localhost/getMunicipalities.php')
        .then(response => {
            setMunicipalities(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    // useEffect to fetch barangays when the selectedMunicipality changes
    useEffect(() => {
        if (selectedMunicipality) {
          fetchBarangays(selectedMunicipality);
        } else {
          setBarangays([]);
        }
      }, [selectedMunicipality]);

    useEffect(() => {
        // Fetch genders when the component mounts
        fetchGenders();
    }, []);


    return (
    <div className='flex justify-center items-center h-screen'>
        <div className='bg-white px-6 pt-5 pb-8 shadow-xl sm:max-w-lg sm:rounded-lg sm:px-10'>
            <div className='40-w p-10 rounded'>
            <form>
                <h1 className='text-black text-4xl text-center pb-5'>Taters Exam Sign Up</h1>
                <div className='mb-2 text-black pb-1 pt-1 text-center'>
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder="Enter Username" className="input input-bordered input-primary w-full max-w-lg text-white" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className='mb-3 text-black p-1 pb-1 pt-1 text-center'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        placeholder="Enter Email"
                        className="input input-bordered input-primary w-full max-w-lg  text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex justify-between'>
                <div className='mb-2 text-black p-1 pb-1 pt-1 text-center'>
                    <label htmlFor='firstname'>First Name</label>
                    <input type='text' placeholder="Enter First Name" className="input input-bordered input-primary w-full max-w-lg  text-white" 
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}/>
                </div>
                <div className='mb-2 text-black pb-1 pt-1 text-center'>
                    <label htmlFor='lastname'>Last Name</label>
                    <input type='text' placeholder="Enter Last Name" className="input input-bordered input-primary w-full max-w-lg  text-white" 
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}/>
                </div>
                </div>
                <div className='mb-3 text-black p-1 pb-1 pt-1 text-center'>
                <label htmlFor='address'>Address</label>
                <input type="text" placeholder="House, Street, Village" className="input input-bordered input-primary w-full max-w-lg  text-white" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className='mb-3 text-black text-center'>
                <div className='flex justify-center'>
                    <div>
                    <label htmlFor='municipality'>Municipality</label>
                    <select
                            id='municipality'
                            className='input input-bordered input-primary w-full max-w-lg  text-white'
                            onChange={(e) => setSelectedMunicipality(e.target.value)}
                        >
                            {municipalities.map(municipality => (
                                <option key={municipality.id} value={municipality.id}>
                                    {municipality.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                    <label htmlFor='barangay'>Barangay</label>
                    <select
                            id='barangay'
                            className='input input-bordered input-primary w-full max-w-lg  text-white'
                            value={selectedBarangay}
                            onChange={(e) => setSelectedBarangay(e.target.value)}
                        >
                            {barangays.map((barangay) => (
                                <option key={barangay.id} value={barangay.id}>
                                    {barangay.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                </div>
                <div className='mb-3 text-black text-center'>
                <div className='flex justify-center'>
                    <div>
                    <label htmlFor='age'>Age</label> {/* Added Age label */}
                    <input type="number" placeholder="Enter Age" className="input input-bordered input-primary w-full max-w-lg  text-white" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <div>
                    <label htmlFor='gender'>Gender</label>
                    <select
                            id='gender'
                            className='input input-bordered input-primary w-full max-w-lg  text-white'
                            onChange={(e) => setSelectedGender(e.target.value)}
                        >
                            {genders.map(gender => (
                                <option key={gender.id} value={gender.id}>
                                    {gender.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                </div>
                <div className='d-grid text-center'>
                <button onClick={handleSubmit} type="submit" className="btn btn-wide bg-green-500 text-black">Sign Up</button>
                </div>
            </form>
            </div>
            <p className='text-right'>
            Already registered? <Link to="/" className='ms-3 text-blue-500'>Login</Link>
            </p>
        </div>
    </div>
  )
}

export default Signup;
