// Main JS File
(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Navbar on scrolling
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".navbar").fadeIn("slow").css("display", "flex");
    } else {
      $(".navbar").fadeOut("slow").css("display", "none");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        "easeInOutExpo",
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Typed Initiate
  if ($(".typed-text-output").length == 1) {
    var typed_strings = $(".typed-text").text();
    var typed = new Typed(".typed-text-output", {
      strings: typed_strings.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Modal Video
  var $videoSrc;
  $(".btn-play").click(function () {
    $videoSrc = $(this).data("src");
  });
  console.log($videoSrc);
  $("#videoModal").on("shown.bs.modal", function (e) {
    $("#video").attr(
      "src",
      $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0",
    );
  });
  $("#videoModal").on("hide.bs.modal", function (e) {
    $("#video").attr("src", $videoSrc);
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Skills
  $(".skill").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" },
  );

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });
})(jQuery);

// Contact form submission
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: this.name.value,
      email: this.email.value,
      company: this.company.value,
      role: this.role.value,
      message: this.message.value,
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwTQpITCwVUr1ReJxP3xQ0XT9eYb-b0rB6mGolmKhdsGbkJqe0whXeeOkf87FOEJvYOdw/exec",
        {
          method: "POST",
          body: new URLSearchParams(formData),
        },
      );

      const data = await response.json();
      if (data.result === "success") {
        contactForm.innerHTML = `
            <div class="text-center p-5">
              <h1 class="text-success mb-3" style="font-size: 3rem;">Thank You!</h1>
              <p style="font-size: 1.3rem;">
                Your message has been successfully submitted, and I’ll get back to you as soon as possible. Looking forward to connecting with you!
              </p>
            </div>
          `;
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  });
});

// Fetch and display data from Google Sheets
document.addEventListener("DOMContentLoaded", () => {
  const apiURL =
    "https://script.google.com/macros/s/AKfycbzJJ6PQZvJxol13jpA8b08KoaqP1IxQSr9ITCpGDDUeVdmyY3PkzYmM5CWdlufg5uzn7g/exec";

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      console.log("Data:", data); // 🔍 debug

      const tbody = document.getElementById("clientTableBody");
      tbody.innerHTML = "";

      data.forEach((row, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${row["Name"] || ""}</td>
          <td>${row["Email ID"] || ""}</td>
          <td>${row["Company"] || ""}</td>
          <td>${row["Job Role"] || ""}</td>
          <td>${row["Message"] || ""}</td>
        `;

        tbody.appendChild(tr);
      });
    })
    .catch((err) => console.error("Fetch error:", err));
});

// Password toggle function
function togglePassword() {
  const input = document.getElementById("adminPassword");
  const icon = event.target;

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

document
  .getElementById("adminLoginForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get admin credentials
    if (
      adminEmail.value === "trhariharasudhan@gmail.com" &&
      adminPassword.value === ">>>>"
    ) {
      document.getElementById("leftImageSection").remove();
      document.getElementById("loginFormSection").remove();
      document.getElementById("dataTableSection").classList.remove("d-none");
    } else {
      alert("Invalid admin credentials");
    }
  });

// Logout function
function logout() {
  location.reload();
}
// Row count for table
let rowCount = 1;

function forgotPassword() {
  alert("Password reset link will be sent to your email.");
}

const cards = document.querySelectorAll(".flex-card-container");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });
});

// Age calculate panna function
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

// DOB set pannrom
const dob = "2003-10-07";

// Age calculate pannrom
const age = calculateAge(dob);

// HTML-ல insert pannrom
document.getElementById("autoAge").innerText = age;

// Chatbot functionality
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- DOM ELEMENTS ---------- */
  const chatMessageContainer = document.querySelector(".chat-body");
  const chatInputField = document.querySelector(".chat-input");
  const voiceMicButton = document.querySelector(".mic-btn");
  const welcomeMessageElement = document.getElementById("chatWelcome");

  /* ---------- STATE ---------- */
  let isMicActive = false;
  let finalTranscript = ""; // ✅ FULL sentence store

  /* ---------- CHAT UI HELPERS ---------- */
  function displayMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `chat-message ${sender}-message`;
    div.innerHTML = text.replace(/\n/g, "<br>");
    chatMessageContainer.appendChild(div);
    chatMessageContainer.scrollTop = chatMessageContainer.scrollHeight;
  }

  // Basic Typing Effect for Chat Messages
  function displayTypingMessage(text, sender, speed = 25) {
    const div = document.createElement("div");
    div.className = `chat-message ${sender}-message`;
    chatMessageContainer.appendChild(div);

    let i = 0;
    let buffer = "";

    function typing() {
      if (i < text.length) {
        buffer += text[i];
        div.innerHTML = buffer.replace(/\n/g, "<br>");
        i++;
        chatMessageContainer.scrollTop = chatMessageContainer.scrollHeight;
        setTimeout(typing, speed);
      }
    }
    typing();
  }

  // Bot logic here
  function generateBotReply(message) {
    const q = message.toLowerCase();

    if (q === "hi" || q === "hello" || q === "hey" || q.includes("vanakkam")) {
      return `Hi Sir/Madam, I am Hari’s assistant. you can ask me anything.
            – If you would like options, please type help or menu, and I will show you some questions.`;
    }

    if (q.includes("help") || q.includes("menu")) {
      return `You can ask me anything! Just type and send the category you select, and I’ll display the related questions for that category looking for, Categories include <b>Personal / Professional / Other details</b> (covering all information about me).<br>
            <b>You can also ask:</b>
            •	What can you do?
            •	Who developed you / your developer?
            <i>Is there anything specific you would like to know?<i>`;
    }

    // optional 1
    if (q.includes("personal")) {
      return `<strong>Personal</strong>
            1. Basic Info
            2. Contact Info
            3. Aspirations
            4. Languages / Interests / Hobbies
            5. Character Traits / Medical Health`;
    }

    if (q.includes("basic") || q.includes("info")) {
      const age = calculateAge("2003-10-07");
      return `My name is <b><mark>Hari Hara Sudhan</mark></b> (TR). I am a <b>${age}-year-old male</b>, born on <b>07 October 2003</b>, and currently <b>single.</b> I reside in <b>Gugai, Salem, Tamil Nadu, India.</b> I am also known by the preferred names <b>Achchuu</b> and <b>Tricky.</b>`;
    }

    if (q.includes("contact") || q.includes("contact info")) {
      return `You can reach me by visiting the <b>Contact</b> section of my portfolio website. There, you’ll find links to my social media profiles such as <b>LinkedIn, GitHub, Email, WhatsApp, and Instagram—</b>feel free to contact me through any platform you prefer.<br><br>Alternatively, you can fill out the <b>Contact form</b> in the same section and submit it, and I’ll get back to you directly as soon as possible.`;
    }
    if (q.includes("aspirations")) {
      return `<strong>Personal Vision for the Future</strong>
            – On a personal level, I aim to explore <b>entrepreneurship across diverse fields,</b> including <b>clothing, food,</b> and <b>import–export,</b> in collaboration with friends and family. My long-term vision is to <b>build sustainable businesses,</b> achieve <b>financial independence,</b> and create a <b>positive impact on my community,</b> while continuously learning and improving myself.`;
    }
    if (
      q.includes("lang") ||
      q.includes("language") ||
      q.includes("languages")
    ) {
      return `I speak <b>Kannada</b> as my native language, and I am fluent in <b>Tamil</b> and <b>English,</b> with the ability to speak, read, and write both languages. Additionally, I have a basic understanding of <b>Telugu</b> and <b>Hindi.</b>`;
    }
    if (q.includes("interests")) {
      return `I am passionate about exploring <b>cutting-edge hardware technologies</b> and love discovering how new innovations work. In software, I enjoy <b>creating websites, apps,</b> and <b>browser extensions,</b> and I am fascinated by <b>ethical hacking.</b> Whenever a <b>new technology emerges,</b> especially in <b>AI and related fields,</b> I am always eager to dive in, learn, and experiment with it.`;
    }
    if (q.includes("hobbies")) {
      return `My hobbies include going on <b>solo bike rides</b> and traveling with friends. I enjoy playing sports such as <b>football, baseball, and basketball.</b> In my free time, I like <b>reading storybooks, writing stories,</b> and <b>listening to music.</b> I also enjoy watching movies across various genres, including <b>action, science fiction, thriller, and drama.</b>`;
    }
    if (q.includes("character") || q.includes("traits")) {
      return `Calm and steady by nature, I am <b>open-minded, conscientious,</b>  and <b>introverted,</b> with a balanced approach to leadership that emphasizes <b>cooperation.</b> I combine both <b>structured (J)</b> and <b>adaptable (P)</b> traits, allowing me to be flexible while maintaining organization.`;
    }
    if (q.includes("medical") || q.includes("health")) {
      return `My blood group is <b>B+.</b> I have <b>no allergies, medical conditions,</b> or <b>physical disabilities,</b> and I take <b>emergency medications only if needed for headaches, fever,</b> or other urgent situations. I follow both <b>vegan and non-vegetarian diets</b> and have received <b>all required vaccinations, including Covid-19</b> and <b>childhood vaccines.</b>`;
    }

    // optional 2
    if (q.includes("professional")) {
      return `<strong>Professional</strong>
            1. Educational Details
            2. Certifications
            3. Skills
            4. Projects
            5. Work Experience
            6. Career Approach / Goal / Referral`;
    }

    if (
      q.includes("edu") ||
      q.includes("education") ||
      q.includes("educational") ||
      q.includes("qualification")
    ) {
      return `<strong>College Education:</strong>
            •	Currently Pursuing a Master of Computer Applications, AVS College of Arts and Science (Autonomous) | 2026 – 2028 | Postgraduate
            •	Completed a Bachelor of Science in Computer Science, Salem Sowdeswari College of Arts and Science (Periyar University) | 2021 – 2024 | Undergraduate<br>
            <strong>Higher Secondary Certificate Education (HSC) – Mathematics in Computer Science</strong>
            <i>The Gugai Higher Secondary School | 2019 – 2021</i>
            •	12th Standard | Marks: 363 | CGPA: 6.1
            •	11th Standard | Marks: 260 | CGPA: 4.3<br>
            <strong>Secondary School Leaving Certificate Education (SSLC)</strong>
            •	10th Standard | Marks: 220 | CGPA: 4.4<br>
            <strong>Specialisation:</strong> Software Development, Networking and Technical Support, with strong expertise in troubleshooting and problem resolution.`;
    }
    if (
      q.includes("cert") ||
      q.includes("Certification") ||
      q.includes("certifications")
    ) {
      return `I hold certifications from <b>Microsoft, Google, AWS, Cisco, IBM, LinkedIn, Infosys, Naan Mudhalvan,</b> as well as from platforms such as <b>Coursera, LinkedIn Learning, Infosys Springboard, Swayam,</b> and others, covering areas including <b>cloud computing, cybersecurity, networking, Python, AI, and technical support.</b><br><br> You can view all my certifications in the <b>Certifications</b> section of my portfolio website.`;
    }
    if (q.includes("skill") || q.includes("Skills") || q.includes("skillset")) {
      return `<strong>Technical & Software Skills</strong><br>
            <b>Technical Support & Troubleshooting</b>
            •	Hardware and software installation, issue resolution, and system optimization<br>
            <b>Systems & Networking</b>
            •	System configuration and maintenance
            •	Linux environments and Windows utilities<br>
            <b>Programming & Development</b>
            •	Python programming <i>(scripting, automation basics, backend fundamentals)</i>
            •	Foundational knowledge of full-stack development<br>
            <b>Development Tools</b>
            •	Cursor, Visual Studio Code, GitHub, Antigravity<br>
            <b>Productivity Tools</b>
            •	Microsoft Office <i>(Word, Excel, PowerPoint)</i><br>
            <b>Cloud Technologies</b>
            •	Familiar with cloud concepts and practical applications AWS basics<br>
            <b>Software Skills <i>(Added Section)</i></b>
            •	Operating Systems: Windows, Linux <i>(Ubuntu/CentOS basics)</i>
            •	Database tools: MySQL, PostgreSQL, MS Access basics
            •	Data analysis & visualization: Excel <i>(Pivot Tables, Macros)</i>, Power BI, Tableau basics
            •	Design & multimedia basics: Canva, Adobe Photoshop fundamentals`;
    }
    if (q.includes("project") || q.includes("projects")) {
      return `I’ve added all my projects to the <b>Projects</b> section of my portfolio website. Each project includes a <b>brief overview</b> and a <b>direct link to my GitHub,</b> so you can explore the code, see how it works, and get a feel for my style. Feel free to check them out and dive into any project that catches your interest!`;
    }
    if (q.includes("work") || q.includes("experience")) {
      return `<strong>Professional Experience</strong><br>
            <b>Freelance Web Developer | Self-Employed</b> <i>6 Months (20 July 2025 – Present)</i>
            I design, develop, and maintain custom websites for clients using HTML, CSS, JavaScript, and backend technologies. I ensure responsive design, user-friendly interfaces, and client-specific functionalities.<br>
            <b>Technical Support Engineer – Lenovo Project | Skypro Technologies Pvt Ltd.</b> <i>(Parent Company: Wipro | Project: Lenovo) | 9 Months (20 November 2024 – 20 July 2025)</i>
            I handled hardware, software, and network troubleshooting for laptops and desktops.<br>
            <b>Web Development Intern | Immaculate Technologies</b> <i>2 Months (1 May 2024 – 30 June 2024)</i>
            I developed and maintained websites using HTML, CSS, JavaScript, and backend technologies.`;
    }
    if (q.includes("approach")) {
      return `<strong>Professional Approach</strong>
            – I communicate in a <b>friendly yet professional manner,</b> approach tasks with <b>responsibility</b> and <b>adaptability,</b> and can provide either <b>concise responses</b> or <b>detailed explanations</b> as needed, all while maintaining a <b>confident</b> and <b>cooperative professional presence.</b>`;
    }
    if (q.includes("goal")) {
      return `<strong>Professional Goal</strong>
            – My short-term goal is to gain <b>deep expertise</b> across technical domains such as <b>cybersecurity, ethical hacking, networking,</b> and <b>system security.</b> I aim to strengthen my <b>problem-solving</b> and <b>analytical skills</b> to become a <b>highly skilled, adaptable IT professional.</b> In the long term, I aspire to <b>leverage this knowledge</b> and <b>experience to establish</b> and <b>manage IT-related ventures,</b> ensuring sustainable growth and creating opportunities for others.`;
    }
    if (q.includes("referral")) {
      return `If you are looking for <b>other people to work with,</b> you can find them under the <b>Contact </b>section of my portfolio. By clicking the <b>User Friends</b> icon, you can view my friends and visit their portfolios to check out their work.`;
    }

    // optional 3
    if (q.includes("other details")) {
      return `<strong>Official Employment</strong>
            1. Government ID Proof & Verification Documents
            2. Banking & Salary Payroll info`;
    }

    if (
      q.includes("id proof") ||
      q.includes("government id") ||
      q.includes("verification document")
    ) {
      return `I hold <b>all major government-issued identification proofs,</b> which serve as recognized verification of my <b>identity, citizenship, financial status, and employment.</b> These include:
            •	<b>Aadhaar Card</b> – issued by the <b>Unique Identification Authority of India (UIDAI),</b> UID: XXXX XXXX 9680
            •	<b>PAN Card</b> – issued by the <b>Income Tax Department of India,</b> PAN: FIHPRXXXXK
            •	<b>Passport</b> – issued by the <b>Government of India</b>
            •	<b>Voter ID</b> – issued by the <b>Election Commission of India</b>
            •	<b>Driving License</b> – issued by the <b>Regional Transport Office (RTO)</b>
            •	<b>Employee ID</b> – issued by my <b>employer</b>
            •	<b>Other official IDs</b> – serving as additional recognized proofs of identity and employment.`;
    }

    if (q.includes("banking") || q.includes("payroll")) {
      return `<b>Bank Details</b>
            I have a bank account with <b>Kotak Mahindra Bank (Kotak 811),</b> used for <b>salary deposits</b> and <b>payroll processing.</b> Please let me know if you require any specific details regarding my bank or payroll information.<br>
            •	<b>Details:</b><b>Bank:</b> Kotak Mahindra Bank, Kotak 811 Branch, Kolkata, Salem, Shevapet
            •	<b>Account Type:</b> Savings Account
            •	<b>Account Number:</b> XXXXX53133
            •	<b>IFSC Code:</b> KKBKXXXXXXX
            •	<b>Usage:</b> Salary deposits and official transactions`;
    }

    /* Extra */
    if (q === "5" || q.includes("what can you do")) {
      return `I can chat with you based on input data and optional questions—fully offline and hassle-free.`;
    }

    if (
      q === "6" ||
      q.includes("who developed you") ||
      q.includes("developer")
    ) {
      return "I was created by the trickiest person, Hari Hara Sudhan—my captain!";
    }

    if (q.includes("bye") || q.includes("exit") || q.includes("quit")) {
      return "Goodbye! It was nice chatting with you. Have a great day ahead!";
    }

    return "I’m here to assist you. Fell free to ask me anything from the optional questions whenever you're ready. type help or menu to see some options.";
  }

  // Send Message Handler
  function handleUserMessage() {
    const text = chatInputField.value.trim();
    if (!text) return;

    if (welcomeMessageElement) welcomeMessageElement.style.display = "none";

    displayMessage(text, "user");
    chatInputField.value = "";
    finalTranscript = "";

    const reply = generateBotReply(text);
    setTimeout(() => displayTypingMessage(reply, "bot"), 400);
  }

  chatInputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserMessage();
  });

  // Speech Recognition Setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let speechRecognizer;

  if (SpeechRecognition) {
    speechRecognizer = new SpeechRecognition();
    speechRecognizer.continuous = true; // ✅ continuous
    speechRecognizer.interimResults = true; // ✅ live typing
    speechRecognizer.lang = "en-US";

    speechRecognizer.onstart = () => {
      isMicActive = true;
      voiceMicButton.style.color = "red";
    };

    speechRecognizer.onend = () => {
      voiceMicButton.style.color = "#6f42c1";

      // 🔁 mic ON irundhaa auto-restart
      if (isMicActive) {
        speechRecognizer.start();
      }
    };

    speechRecognizer.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // ✅ FULL speech → text
      chatInputField.value = finalTranscript + interimTranscript;
    };
  }

  // Mic Button Click Event
  voiceMicButton.addEventListener("click", () => {
    if (!speechRecognizer) return;

    if (!isMicActive) {
      isMicActive = true;
      finalTranscript = chatInputField.value + " ";
      speechRecognizer.start(); // ▶ start listening
    } else {
      isMicActive = false;
      speechRecognizer.stop(); // ⛔ stop fully
    }
  });
});

function toggleOptions() {
  const menu = document.getElementById("plusOptions");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// click outside → close
document.addEventListener("click", function (e) {
  if (!e.target.closest(".plus-btn") && !e.target.closest(".plus-options")) {
    document.getElementById("plusOptions").style.display = "none";
  }
});
