
async function getTrackingData(){
    const trackingNumber = document.getElementById('inputcode').value;
    if (!trackingNumber || trackingNumber.lenght < 5) {
        document.getElementById('courier-modal-content').innerText = 'This tracking code is invalid, Kindly enter a correct tracking code';
        document.getElementById('courier-modal').style.display = 'block';
        return;
    }

    if(!trackingNumber){
        document.getElementById('courier-modal-content').innerText = 'Please enter your tracking code';
        document.getElementById('courier-modal').style.display = 'block';
        return;
    }

    try {
        const getData = await fetch(`http://localhost:3000/data/${trackingNumber}`, {
          method: 'GET',
          headers: {
              'content-type': 'application/json'
            }  
        });

        console.log(getData);

        if (!getData.ok) {
            document.getElementById('courier-modal-content').innerText = 'sorry we are having issues getting your courier details';
            document.getElementById('courier-modal').style.display = 'block';
            return;
        }
        
        const data = await getData.json();
       console.log(data)
        // Display data
        document.getElementById('orderNumber').innerText = data.tracking_code;
        document.getElementById('customerName').innerText = data.sender_name;
        document.getElementById('Sender_address').innerText = data.reciever_address;
        document.getElementById('recieverName').innerText = data.reciever_name;
        document.getElementById('recieverAddress').innerText = data.sender_address;
        document.getElementById('status').innerText = data.status;
        document.getElementById('date').innerText = new Date(data.delivery_date).toLocaleDateString();

        document.getElementById('courier-modal').style.display = "block";
    } catch (error) {
        console.error(error);
        alert("Error fetching tracking data.");
    }
}



// Close the modal when the user clicks on <span> (x)
const CloseModal = document.getElementById('close-modal');
CloseModal.onclick = function(){
    document.getElementById('courier-modal').style.display = 'none';
};

const CloseBtn = document.getElementById('modal-ok');
CloseBtn.onclick = function(){
    document.getElementById('courier-modal').style.display = 'none';
}


