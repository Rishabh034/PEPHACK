const puppeteer = require('puppeteer');
let nodemailer = require("nodemailer");
let content = process.argv.slice(2);
console.log(content);
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    slowMo: 50,

  });
  let tab;
  const page = await browser.newPage();
  await page.goto('https://maps.google.com');
  await page.click("button[aria-label='Directions']");
  await page.waitForSelector(".gstl_51.sbib_a .sbib_b .tactile-searchbox-input",{visible:true});
  await page.type(".gstl_51.sbib_a .sbib_b .tactile-searchbox-input", content[0]);
  await page.waitForSelector(".gstl_52.sbib_a .sbib_b .tactile-searchbox-input",{visible:true});
  await page.type(".gstl_52.sbib_a .sbib_b .tactile-searchbox-input", content[1]);
  await page.click('#directions-searchbox-1>button[aria-label="Search"]');
  // tab=page;
  let a = {};

 let trainname;
  await page.waitForTimeout(3000);
  await page.waitForSelector('[jsan="7.section-directions-trip-title,0.id"]');
  let iconkadata = await page.$$('[jsan="7.section-directions-trip-title,0.id"]');
  // console.log(iconkadata);
  for (let i = 0; i < iconkadata.length; i++) {
    let data = await page.evaluate(function (ele) {

      return ele.innerText;
    }, iconkadata[i])
    //  console.log(data);
    await page.waitForSelector(".section-directions-trip-travel-mode-icon", { visible: true, timeout: 3000 });
    let icon = await page.$$(".section-directions-trip-travel-mode-icon");


    let data1 = await page.evaluate(function (ele) {
      return ele.getAttribute("aria-label");
    }, icon[i])

    if (data1 == "  Transit  ") {
      a.Train = data;
    }
    else if (data1 == "  Driving  ") {
      a.Car = data;
    }
    else if (data1 == "  Walking  ") {
      a.Walking = data;
    }

    else if (data1 == "  Cycling  ") {
      a.Cycling = data;
    }

    else if (data1 =="  Flights  ") {
      a.Flights = data;
    }


  }
  let data2=await page.evaluate(function(){
    let train=document.querySelectorAll(".renderable-component-text-box-content");
    let trainname=train[1].innerText;
    return trainname;
  })
  a.TrainName=data2;
  //  await page.waitForTimeout(3000);
  //  await page.waitForSelector('[jstcache="720"]');
  // let traindata= await page.$$('[jstcache="720"]');
  //   let trainname =await page.evaluate(function(ele){
  //     return ele.innerText;
  //   },traindata[1]);
  //   let b=[];

  //   console.log(trainname);
  console.log(a);
  //console.log(b);


  //   await page.evaluate( function(){
  //  // let a=[];
  //   console.log("Rishabh");

  //          for(let i=0;i<iconkadata.length;i++)
  //          {
  //               let data=iconkadata[i];
  //               //let ch=data.textContent;
  //               console.log(data);
  //               a.push(data);
  //          }
  //         // return a;
  //   })
  //console.log(icon);

  // console.log(icon.length);
  //  for(let i=0;i<icon;i++){
  //  //await page.waitForSelector('[jsan="7.travel-mode,0.data-travel_mode,22.jsaction"] button');
  //  await page.click('[jsan="7.travel-mode,0.data-travel_mode,22.jsaction"] button');
  // }



  //await page.pdf({path: 'hackernews.pdf', format: 'A4'});

  // await browser.close();
  console.log("Succesful!!!");
})();
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: 'testingid295@gmail.com',
//     pass: '******'
//   }
// });
// var mailOptions = {
//   from: 'testingid295@gmail.com',
//   to: 'ram5626141@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'Yeah car booked be ready to drive. Happy journey!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


