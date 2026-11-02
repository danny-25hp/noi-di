// Nội dung bài học. Mỗi câu:
//  en: câu chuẩn để chấm điểm
//  linked: cách đọc nối âm (‿ = nối, · = ngắt hơi nhẹ)
//  vi: phụ đề tiếng Việt
//  tip: lời nhắn thân mật của "cô Mây" (nhân vật hư cấu)
// Roleplay: partner nói, bạn trả lời; accept = các câu được chấp nhận.

window.LESSONS = [
  {
    id: "l1",
    level: "A2",
    emoji: "👋",
    title: "Làm quen ở chỗ mới",
    subtitle: "Chào hỏi, hỏi nghề, rủ đi cà phê",
    phrases: [
      {
        en: "Hey, I'm new here.",
        linked: "Hey · I'm‿new here.",
        vi: "Chào, mình mới tới đây.",
        tip: "Người ta hay nói \"Hey\" chứ ít khi \"Hello\" cứng đơ đâu nè. \"I'm\" đọc gọn thành /aim/, đừng tách \"I am\" ra nha."
      },
      {
        en: "I'm pretty close with everyone in my team.",
        linked: "I'm pretty close‿with everyone‿in my team.",
        vi: "Mình khá thân với mọi người trong team.",
        tip: "\"Pretty\" ở đây là \"khá\", không phải \"xinh\" đâu nha 😄. Chữ t ở giữa đọc nhẹ như /prí-đi/. \"everyone‿in\" nối liền: /éh-vri-wă-nin/."
      },
      {
        en: "What do you do for a living?",
        linked: "What‿do‿you do · for‿a living?",
        vi: "Bạn làm nghề gì vậy?",
        tip: "Người bản xứ nói nhanh thành /wă-đờ-ya đu/. Hỏi nghề lịch sự hơn \"What is your job?\" nhiều."
      },
      {
        en: "I work in a factory. I handle the planning.",
        linked: "I work‿in‿a factory · I handle the planning.",
        vi: "Mình làm ở nhà máy. Mình lo phần kế hoạch.",
        tip: "\"work‿in‿a\" nối thành /wơ-ki-nờ/. \"handle\" = lo, phụ trách — nghe tự nhiên hơn \"I am responsible for\"."
      },
      {
        en: "How long have you been here?",
        linked: "How long‿have‿you been here?",
        vi: "Bạn ở đây (làm ở đây) bao lâu rồi?",
        tip: "\"have you\" đọc lướt thành /hă-vờ-ya/. Lên giọng nhẹ ở cuối câu nha."
      },
      {
        en: "Let's grab a coffee sometime.",
        linked: "Let's grab‿a coffee sometime.",
        vi: "Hôm nào đi cà phê nha.",
        tip: "\"grab a coffee\" là cụm siêu đời thường, nghĩa là \"đi uống cà phê\". \"grab‿a\" nối thành /grá-bờ/."
      },
      {
        en: "Sounds good. See you around!",
        linked: "Sounds good · See‿you‿around!",
        vi: "Nghe được đó. Gặp lại sau nha!",
        tip: "\"Sounds good\" dùng thay cho \"OK\" cực nhiều. \"you‿around\" nối thành /yu-wờ-ráon/."
      }
    ],
    roleplay: {
      partner: "Tom",
      intro: "Bạn vừa vào công ty mới. Tom – đồng nghiệp – tới bắt chuyện.",
      turns: [
        { them: "Hi! Are you new here?", them_vi: "Chào! Bạn mới tới hả?",
          you: "Yeah, I'm new here.", you_vi: "Ừ, mình mới tới.",
          accept: ["Yeah, I'm new here.", "Yes, I'm new here.", "Yeah I'm new.", "Hey, I'm new here."] },
        { them: "Welcome! What do you do?", them_vi: "Chào mừng! Bạn làm gì vậy?",
          you: "I work in the planning team.", you_vi: "Mình làm ở team kế hoạch.",
          accept: ["I work in the planning team.", "I handle the planning.", "I work in planning."] },
        { them: "Cool. How long have you been here?", them_vi: "Hay đó. Bạn ở đây bao lâu rồi?",
          you: "Just two weeks.", you_vi: "Mới hai tuần thôi.",
          accept: ["Just two weeks.", "Only two weeks.", "Two weeks.", "About two weeks."] },
        { them: "Nice! Let's grab a coffee sometime.", them_vi: "Hay quá! Hôm nào đi cà phê nha.",
          you: "Sounds good. See you around!", you_vi: "Được đó. Gặp lại sau nha!",
          accept: ["Sounds good. See you around!", "Sounds good!", "Sure, see you around!"] }
      ]
    }
  },
  {
    id: "l2",
    level: "A2",
    emoji: "☕",
    title: "Gọi đồ uống, đồ ăn",
    subtitle: "Gọi món, mang đi, trả tiền",
    phrases: [
      {
        en: "Can I get an iced latte, please?",
        linked: "Can‿I get‿an iced latte, please?",
        vi: "Cho mình một ly latte đá nha.",
        tip: "Người bản xứ gọi món bằng \"Can I get...\" chứ không nói \"I want\" (nghe hơi cộc). \"get‿an\" nối thành /gé-đần/."
      },
      {
        en: "For here or to go?",
        linked: "For here‿or to go?",
        vi: "Uống ở đây hay mang đi?",
        tip: "Câu này nhân viên hỏi hoài. \"here‿or\" nối thành /hía-rờ/."
      },
      {
        en: "To go, please.",
        linked: "To go, please.",
        vi: "Mang đi nha.",
        tip: "Ngắn gọn vậy là đủ. \"to\" đọc nhẹ /tờ/."
      },
      {
        en: "Could I get that with less sugar?",
        linked: "Could‿I get that‿with less sugar?",
        vi: "Cho mình ít đường hơn được không?",
        tip: "\"Could‿I\" nối thành /cú-đai/. Muốn nhờ gì lịch sự cứ \"Could I...\"."
      },
      {
        en: "Can I pay by card?",
        linked: "Can‿I pay by card?",
        vi: "Mình trả bằng thẻ được không?",
        tip: "\"Can‿I\" nối thành /kờ-nai/, \"can\" đọc yếu thôi."
      },
      {
        en: "That's all, thanks.",
        linked: "That's‿all, thanks.",
        vi: "Vậy thôi, cảm ơn nha.",
        tip: "\"That's‿all\" nối thành /đát-só/. Nói xong cười một cái là chuẩn bài 😄."
      }
    ],
    roleplay: {
      partner: "Barista",
      intro: "Bạn vào quán cà phê. Barista hỏi bạn.",
      turns: [
        { them: "Hi there! What can I get for you?", them_vi: "Chào bạn! Bạn dùng gì?",
          you: "Can I get an iced latte, please?", you_vi: "Cho mình một ly latte đá.",
          accept: ["Can I get an iced latte, please?", "Can I get an iced latte?", "An iced latte, please."] },
        { them: "Sure. For here or to go?", them_vi: "Được. Uống đây hay mang đi?",
          you: "To go, please.", you_vi: "Mang đi nha.",
          accept: ["To go, please.", "To go.", "For here, please."] },
        { them: "Anything else?", them_vi: "Còn gì nữa không?",
          you: "That's all, thanks.", you_vi: "Vậy thôi, cảm ơn.",
          accept: ["That's all, thanks.", "That's all.", "No, that's all, thanks."] },
        { them: "That's five dollars.", them_vi: "Của bạn năm đô.",
          you: "Can I pay by card?", you_vi: "Trả thẻ được không?",
          accept: ["Can I pay by card?", "Can I pay with card?", "Card, please."] }
      ]
    }
  },
  {
    id: "l3",
    level: "A2",
    emoji: "💼",
    title: "Small talk ở chỗ làm",
    subtitle: "Hỏi thăm, bận việc, chào về",
    phrases: [
      {
        en: "How's it going?",
        linked: "How's‿it going?",
        vi: "Dạo này sao rồi? / Khỏe không?",
        tip: "Đây là \"How are you\" phiên bản đời thường. \"How's‿it\" nối thành /háo-zịt/."
      },
      {
        en: "Not bad. Kind of busy today.",
        linked: "Not bad · Kind‿of busy today.",
        vi: "Cũng được. Hôm nay hơi bận.",
        tip: "\"Kind of\" người ta nói thành /kai-nờ/ (viết lóng là \"kinda\"). Đừng trả lời \"I'm fine, thank you, and you?\" như sách nha 😆."
      },
      {
        en: "I'm swamped with work.",
        linked: "I'm swamped‿with work.",
        vi: "Mình ngập đầu trong việc luôn.",
        tip: "\"swamped\" = ngập (như đầm lầy). Khẩu ngữ xịn hơn \"very busy\" nhiều."
      },
      {
        en: "Let me get back to you on that.",
        linked: "Let me get back to you‿on that.",
        vi: "Để mình trả lời bạn sau về vụ đó nha.",
        tip: "Câu cứu cánh khi chưa biết trả lời. \"Let me\" đọc dính /lé-mi/."
      },
      {
        en: "No worries, take your time.",
        linked: "No worries · take your time.",
        vi: "Không sao, cứ từ từ.",
        tip: "\"No worries\" = không sao đâu. \"take your\" đọc /tếch-cho/."
      },
      {
        en: "I'm heading out. See you tomorrow!",
        linked: "I'm heading‿out · See‿you tomorrow!",
        vi: "Mình về trước nha. Mai gặp!",
        tip: "\"heading out\" = chuẩn bị đi/về. \"heading‿out\" nối thành /hé-đing-ngao/."
      }
    ],
    roleplay: {
      partner: "Anna",
      intro: "Gặp Anna – đồng nghiệp – ở máy pha cà phê.",
      turns: [
        { them: "Hey! How's it going?", them_vi: "Ê! Dạo này sao rồi?",
          you: "Not bad. Kind of busy today.", you_vi: "Cũng được. Hôm nay hơi bận.",
          accept: ["Not bad. Kind of busy today.", "Not bad, kinda busy today.", "Not bad.", "I'm swamped with work."] },
        { them: "Can you send me the report this afternoon?", them_vi: "Chiều nay gửi mình báo cáo được không?",
          you: "Let me get back to you on that.", you_vi: "Để mình báo lại bạn sau nha.",
          accept: ["Let me get back to you on that.", "Let me get back to you."] },
        { them: "Sure, no rush.", them_vi: "Ừ, không gấp đâu.",
          you: "Thanks. I'm heading out. See you tomorrow!", you_vi: "Cảm ơn. Mình về trước nha. Mai gặp!",
          accept: ["Thanks. I'm heading out. See you tomorrow!", "I'm heading out. See you tomorrow!", "See you tomorrow!"] }
      ]
    }
  }
];

// Lộ trình A2 → B1 (các bài chưa có nội dung hiển thị "Sắp có")
window.ROADMAP = [
  { level: "A2", title: "Làm quen ở chỗ mới", id: "l1" },
  { level: "A2", title: "Gọi đồ uống, đồ ăn", id: "l2" },
  { level: "A2", title: "Small talk ở chỗ làm", id: "l3" },
  { level: "A2", title: "Hỏi đường & đi lại" },
  { level: "A2", title: "Mua sắm, hỏi giá, đổi size" },
  { level: "A2", title: "Nói về sở thích & cuối tuần" },
  { level: "A2+", title: "Kể chuyện đã xảy ra (quá khứ)" },
  { level: "A2+", title: "Rủ rê, hẹn giờ, đổi lịch" },
  { level: "A2+", title: "Gọi điện, đặt bàn, đặt lịch" },
  { level: "B1", title: "Nêu ý kiến, đồng ý & phản đối khéo" },
  { level: "B1", title: "Xử lý sự cố: phàn nàn, đổi trả" },
  { level: "B1", title: "Giới thiệu công việc & phỏng vấn" }
];
