//email


//notification


//otp
export const GenerateOtp = () => {

    const otp = Math.floor(10000 + Math.random() * 90000)
    let expiry = new Date()
    expiry.setTime( new Date().getTime() + (30 * 60 * 1000))

    return { otp, expiry }
}

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
    const accountSid = 'ACdefba67009f034d9aa90b3e4f8d2407a';
    const authToken = '177c4c1bb4a441661ec4c67dfca05f72';
    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+13185952859',
        to: `+18${toPhoneNumber}`,
        //channel: 'sms'
    });
    return response;

}

//payment notificaton or emails