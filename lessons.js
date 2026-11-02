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
  },
  {
    id: "l15",
    level: "A2",
    emoji: "👂",
    title: "Nghe không kịp? Hỏi lại!",
    subtitle: "Nhờ nói chậm, hỏi lại, xác nhận",
    phrases: [
      { en: "Sorry, could you say that again?", linked: "Sorry · could‿you say that‿again?", vi: "Xin lỗi, bạn nói lại được không?",
        tip: "Câu SỐNG CÒN tuần đầu nè. Nghe không kịp là cứ hỏi lại, người bản xứ hỏi lại nhau hoài. \"could‿you\" nối thành /cú-chù/." },
      { en: "Could you speak a bit more slowly?", linked: "Could‿you speak‿a bit more slowly?", vi: "Bạn nói chậm hơn chút được không?",
        tip: "\"a bit\" = một chút, mềm hơn nhiều so với \"Speak slowly!\". \"speak‿a\" nối thành /spí-cờ/." },
      { en: "Sorry, what does that mean?", linked: "Sorry · what does that mean?", vi: "Xin lỗi, cái đó nghĩa là gì?",
        tip: "Gặp từ lạ là hỏi luôn, đừng gật gù cho qua nha 😄. \"what does\" đọc lướt /wăt-đờz/." },
      { en: "Do you mean the meeting on Friday?", linked: "Do‿you mean the meeting‿on Friday?", vi: "Ý bạn là cuộc họp hôm thứ Sáu hả?",
        tip: "Khung \"Do you mean...?\" để xác nhận lại. Thay phần sau bằng thứ bạn đoán: \"Do you mean this one?\"." },
      { en: "Let me make sure I got this right.", linked: "Let me make sure‿I got this right.", vi: "Để mình kiểm tra lại xem hiểu đúng chưa.",
        tip: "Nói câu này rồi nhắc lại ý chính. Người nghe sẽ thấy bạn rất chuyên nghiệp đó." },
      { en: "Got it. Thanks for explaining.", linked: "Got‿it · Thanks for‿explaining.", vi: "Hiểu rồi. Cảm ơn đã giải thích nha.",
        tip: "\"Got it\" = hiểu rồi, dùng siêu nhiều. \"Got‿it\" nối thành /gá-đít/." }
    ],
    roleplay: {
      partner: "Mike",
      intro: "Mike – sếp người nước ngoài – nói nhanh quá. Bạn hỏi lại cho chắc.",
      turns: [
        { them: "We need the updated schedule before the review on Friday.", them_vi: "Mình cần lịch cập nhật trước buổi review thứ Sáu.",
          you: "Sorry, could you say that again?", you_vi: "Xin lỗi, nói lại giúp mình được không?",
          accept: ["Sorry, could you say that again?", "Could you say that again?", "Sorry, could you speak a bit more slowly?"] },
        { them: "Sure. The updated schedule, before Friday's review.", them_vi: "Được. Lịch cập nhật, trước buổi review thứ Sáu.",
          you: "Do you mean the meeting on Friday?", you_vi: "Ý anh là cuộc họp thứ Sáu hả?",
          accept: ["Do you mean the meeting on Friday?", "You mean the meeting on Friday?", "Do you mean Friday?"] },
        { them: "Yes, exactly. Friday morning.", them_vi: "Đúng rồi. Sáng thứ Sáu.",
          you: "Got it. Thanks for explaining.", you_vi: "Hiểu rồi. Cảm ơn anh.",
          accept: ["Got it. Thanks for explaining.", "Got it, thanks.", "Got it. Thanks."] }
      ]
    }
  },
  {
    id: "l4",
    level: "A2",
    emoji: "🧭",
    title: "Hỏi đường & đi lại",
    subtitle: "Hỏi đường, đi taxi, hỏi giờ xe",
    phrases: [
      { en: "Excuse me, how do I get to the station?", linked: "Excuse me · how do‿I get to the station?", vi: "Xin lỗi, đi tới nhà ga thế nào ạ?",
        tip: "\"How do I get to...?\" là khung hỏi đường chuẩn. \"Excuse me\" để bắt chuyện người lạ, đừng dùng \"Sorry\" chỗ này nha." },
      { en: "Is it far from here?", linked: "Is‿it far from here?", vi: "Có xa đây không?",
        tip: "\"Is‿it\" nối thành /i-zít/. Câu ngắn mà dùng được ở mọi nơi." },
      { en: "Go straight and turn left at the corner.", linked: "Go straight‿and turn left‿at the corner.", vi: "Đi thẳng rồi rẽ trái ở góc đường.",
        tip: "Câu này để NGHE nhiều hơn là nói. \"left‿at\" nối thành /lép-tát/, âm t gần như mất." },
      { en: "Can you take me to this address?", linked: "Can‿you take me to this‿address?", vi: "Chở tôi tới địa chỉ này được không?",
        tip: "Đi taxi chỉ cần câu này + đưa điện thoại. \"this‿address\" nối thành /đi-sờ-đrét/." },
      { en: "How long does it take?", linked: "How long does‿it take?", vi: "Đi mất bao lâu?",
        tip: "\"does‿it\" nối thành /đờ-zịt/. Hỏi thời gian đi lại, chờ đợi đều dùng được." },
      { en: "Could you drop me off here?", linked: "Could‿you drop me‿off here?", vi: "Cho tôi xuống đây được không?",
        tip: "\"drop off\" = thả xuống. \"me‿off\" nối thành /mi-yóp/." }
    ],
    roleplay: {
      partner: "Driver",
      intro: "Bạn lên taxi ở sân bay.",
      turns: [
        { them: "Hi, where to?", them_vi: "Chào, đi đâu đây?",
          you: "Can you take me to this address?", you_vi: "Chở tôi tới địa chỉ này nha.",
          accept: ["Can you take me to this address?", "Could you take me to this address?", "This address, please."] },
        { them: "Sure, no problem.", them_vi: "Được, không vấn đề.",
          you: "How long does it take?", you_vi: "Đi mất bao lâu vậy?",
          accept: ["How long does it take?", "How long will it take?", "Is it far from here?"] },
        { them: "About twenty minutes. Here we are.", them_vi: "Khoảng 20 phút. Tới rồi nè.",
          you: "Could you drop me off here?", you_vi: "Cho tôi xuống đây nha.",
          accept: ["Could you drop me off here?", "Can you drop me off here?", "Here is fine, thanks."] }
      ]
    }
  },
  {
    id: "l5",
    level: "A2",
    emoji: "🛍️",
    title: "Mua sắm, hỏi giá, đổi size",
    subtitle: "Hỏi giá, thử đồ, đổi size",
    phrases: [
      { en: "How much is this?", linked: "How much‿is this?", vi: "Cái này bao nhiêu tiền?",
        tip: "\"much‿is\" nối thành /mă-chiz/. Nhiều món thì \"How much are these?\"." },
      { en: "I'm just looking, thanks.", linked: "I'm just looking · thanks.", vi: "Tôi xem thôi, cảm ơn.",
        tip: "Khi nhân viên hỏi \"Can I help you?\" mà bạn chưa cần gì. Nói kèm nụ cười là ổn." },
      { en: "Do you have this in a medium?", linked: "Do‿you have this‿in‿a medium?", vi: "Cái này có size M không?",
        tip: "Size đọc là small / medium / large. \"this‿in‿a\" nối thành /đi-si-nờ/." },
      { en: "Can I try it on?", linked: "Can‿I try‿it‿on?", vi: "Tôi mặc thử được không?",
        tip: "\"try it on\" nối liền /trai-ơ-đón/. Nghe như một từ luôn đó." },
      { en: "It's a bit too big for me.", linked: "It's‿a bit too big for me.", vi: "Hơi rộng so với tôi.",
        tip: "\"a bit too\" = hơi quá. Đổi \"big\" thành \"small / tight / long\" là dùng được nhiều kiểu." },
      { en: "I'll take it.", linked: "I'll take‿it.", vi: "Tôi lấy cái này.",
        tip: "\"I'll\" đọc /ail/ gọn thôi. \"take‿it\" nối thành /tây-kít/." }
    ],
    roleplay: {
      partner: "Staff",
      intro: "Bạn vào shop quần áo.",
      turns: [
        { them: "Hi! Can I help you find anything?", them_vi: "Chào bạn! Mình giúp bạn tìm gì không?",
          you: "Do you have this in a medium?", you_vi: "Cái này có size M không?",
          accept: ["Do you have this in a medium?", "Do you have this in medium?", "Do you have a medium?"] },
        { them: "Yes, here you go.", them_vi: "Có, của bạn nè.",
          you: "Can I try it on?", you_vi: "Mình mặc thử được không?",
          accept: ["Can I try it on?", "Could I try it on?"] },
        { them: "How does it fit?", them_vi: "Mặc vừa không?",
          you: "It fits well. I'll take it.", you_vi: "Vừa lắm. Mình lấy cái này.",
          accept: ["It fits well. I'll take it.", "I'll take it.", "It's good. I'll take it."] }
      ]
    }
  },
  {
    id: "l6",
    level: "A2",
    emoji: "🎣",
    title: "Sở thích & cuối tuần",
    subtitle: "Hỏi cuối tuần, kể sở thích",
    phrases: [
      { en: "What did you do last weekend?", linked: "What did‿you do last weekend?", vi: "Cuối tuần rồi bạn làm gì?",
        tip: "Câu hỏi thứ Hai kinh điển. \"did‿you\" đọc thành /đí-chù/." },
      { en: "Nothing much, I just stayed home.", linked: "Nothing much · I just stayed home.", vi: "Không có gì nhiều, mình ở nhà thôi.",
        tip: "Trả lời thật thà cũng được, quan trọng là nói tiếp được. Thêm \"and watched a movie\" chẳng hạn." },
      { en: "I went fishing with my friends.", linked: "I went fishing with my friends.", vi: "Mình đi câu cá với bạn bè.",
        tip: "Khung \"I went + V-ing\": went swimming, went shopping, went hiking. Học một khung dùng được cả chục câu." },
      { en: "In my free time, I like playing football.", linked: "In my free time · I like playing football.", vi: "Lúc rảnh mình thích đá bóng.",
        tip: "\"In my free time\" mở đầu cho tự nhiên. Thay \"playing football\" bằng sở thích của bạn nha." },
      { en: "How about you?", linked: "How‿about you?", vi: "Còn bạn thì sao?",
        tip: "Câu ném bóng lại cho người kia. Nhờ nó mà cuộc nói chuyện không bị chết 😄. \"How‿about\" /hao-wờ-bao/." },
      { en: "That sounds fun!", linked: "That sounds fun!", vi: "Nghe vui ghê!",
        tip: "Phản ứng khi người khác kể. Thêm \"Where did you go?\" để hỏi tiếp là đẹp." }
    ],
    roleplay: {
      partner: "Lisa",
      intro: "Sáng thứ Hai, Lisa hỏi thăm bạn.",
      turns: [
        { them: "Hey! What did you do last weekend?", them_vi: "Ê! Cuối tuần rồi làm gì?",
          you: "I went fishing with my friends.", you_vi: "Mình đi câu cá với bạn.",
          accept: ["I went fishing with my friends.", "I went fishing.", "Nothing much, I just stayed home."] },
        { them: "Nice! I went hiking.", them_vi: "Hay đó! Mình đi leo núi.",
          you: "That sounds fun! Where did you go?", you_vi: "Nghe vui ghê! Đi đâu vậy?",
          accept: ["That sounds fun! Where did you go?", "That sounds fun!", "Where did you go?"] },
        { them: "Ba Vi mountain. It was beautiful.", them_vi: "Núi Ba Vì. Đẹp lắm.",
          you: "Cool. I want to go there too.", you_vi: "Hay quá. Mình cũng muốn đi.",
          accept: ["Cool. I want to go there too.", "I want to go there too.", "Cool, I'd love to go there."] }
      ]
    }
  },
  {
    id: "l7",
    level: "A2+",
    emoji: "📖",
    title: "Kể chuyện đã xảy ra",
    subtitle: "Thì quá khứ, kể theo thứ tự",
    phrases: [
      { en: "You won't believe what happened today.", linked: "You won't believe what happened today.", vi: "Bạn không tin nổi chuyện hôm nay đâu.",
        tip: "Câu mở màn để kể chuyện, ai nghe cũng tò mò. \"won't\" khác \"want\" nha: /wôn/." },
      { en: "This morning, the machine broke down.", linked: "This morning · the machine broke down.", vi: "Sáng nay máy bị hỏng.",
        tip: "\"break down\" → quá khứ \"broke down\". Kể chuyện luôn dùng quá khứ: went, saw, had, got." },
      { en: "So we had to stop the line for an hour.", linked: "So we had to stop the line for‿an hour.", vi: "Nên tụi mình phải dừng chuyền một tiếng.",
        tip: "\"had to\" = đã phải. \"had to\" đọc dính /hát-tờ/. \"an hour\" chữ h câm: /ờ-nao-ơ/." },
      { en: "After that, everything went back to normal.", linked: "After that · everything went back to normal.", vi: "Sau đó mọi thứ bình thường lại.",
        tip: "Dùng \"First... Then... After that... In the end...\" để kể theo thứ tự, nghe mạch lạc liền." },
      { en: "In the end, we finished on time.", linked: "In the‿end · we finished‿on time.", vi: "Cuối cùng tụi mình vẫn xong đúng giờ.",
        tip: "\"finished‿on\" nối thành /phí-ni-shtón/. Đuôi -ed sau sh đọc /t/." },
      { en: "It was a long day.", linked: "It was‿a long day.", vi: "Đúng là một ngày dài.",
        tip: "Câu kết thở dài 😮‍💨. \"was‿a\" nối thành /wơ-zờ/." }
    ],
    roleplay: {
      partner: "Ben",
      intro: "Ben hỏi sao hôm nay bạn trông mệt.",
      turns: [
        { them: "You look tired. What happened?", them_vi: "Trông mệt vậy. Có chuyện gì thế?",
          you: "This morning, the machine broke down.", you_vi: "Sáng nay máy bị hỏng.",
          accept: ["This morning, the machine broke down.", "The machine broke down this morning.", "The machine broke down."] },
        { them: "Oh no. What did you do?", them_vi: "Trời. Rồi làm sao?",
          you: "We had to stop the line for an hour.", you_vi: "Tụi mình phải dừng chuyền một tiếng.",
          accept: ["We had to stop the line for an hour.", "So we had to stop the line for an hour.", "We stopped the line for an hour."] },
        { them: "Did you finish everything?", them_vi: "Có xong hết không?",
          you: "Yes. In the end, we finished on time.", you_vi: "Có. Cuối cùng vẫn xong đúng giờ.",
          accept: ["Yes. In the end, we finished on time.", "In the end, we finished on time.", "Yes, we finished on time."] }
      ]
    }
  },
  {
    id: "l8",
    level: "A2+",
    emoji: "📅",
    title: "Rủ rê, hẹn giờ, đổi lịch",
    subtitle: "Rủ đi, chốt giờ, dời lịch",
    phrases: [
      { en: "Are you free on Saturday?", linked: "Are‿you free‿on Saturday?", vi: "Thứ Bảy bạn rảnh không?",
        tip: "Hỏi trước khi rủ là lịch sự nhất. \"free‿on\" nối thành /phri-yon/." },
      { en: "Do you want to have dinner together?", linked: "Do‿you want‿to have dinner together?", vi: "Đi ăn tối chung không?",
        tip: "\"want to\" người ta nói /wa-nờ/ (wanna). \"Do you\" lướt thành /đờ-yờ/." },
      { en: "What time works for you?", linked: "What time works for you?", vi: "Mấy giờ thì tiện cho bạn?",
        tip: "Câu xịn để chốt giờ, dùng cả khi hẹn họp. \"works for you\" = tiện cho bạn." },
      { en: "How about seven o'clock?", linked: "How‿about seven‿o'clock?", vi: "Bảy giờ được không?",
        tip: "\"How about + giờ/ngày\" để đề xuất. \"seven‿o'clock\" nối thành /sé-vờ-nờ-clóc/." },
      { en: "Something came up. Can we reschedule?", linked: "Something came‿up · Can we reschedule?", vi: "Có việc đột xuất. Mình dời lịch được không?",
        tip: "\"Something came up\" = có việc đột xuất, khỏi cần giải thích dài. \"reschedule\" = dời lịch." },
      { en: "Let's do it next week instead.", linked: "Let's do‿it next week‿instead.", vi: "Để tuần sau nha.",
        tip: "\"instead\" = thay vào đó. \"week‿instead\" nối thành /wí-kin-sted/." }
    ],
    roleplay: {
      partner: "Jenny",
      intro: "Bạn rủ Jenny đi ăn, rồi phải dời lịch.",
      turns: [
        { them: "Hey, what's up?", them_vi: "Ê, có gì không?",
          you: "Are you free on Saturday?", you_vi: "Thứ Bảy rảnh không?",
          accept: ["Are you free on Saturday?", "Are you free Saturday?", "Do you want to have dinner together?"] },
        { them: "Yes! What time works for you?", them_vi: "Rảnh! Mấy giờ thì tiện?",
          you: "How about seven o'clock?", you_vi: "Bảy giờ được không?",
          accept: ["How about seven o'clock?", "How about seven?", "Seven o'clock?"] },
        { them: "Perfect. See you then!", them_vi: "Tuyệt. Hẹn gặp nha!",
          you: "Sorry, something came up. Can we reschedule?", you_vi: "Xin lỗi, có việc đột xuất. Dời lịch được không?",
          accept: ["Sorry, something came up. Can we reschedule?", "Something came up. Can we reschedule?", "Can we reschedule?"] }
      ]
    }
  },
  {
    id: "l9",
    level: "A2+",
    emoji: "📞",
    title: "Gọi điện, đặt bàn, đặt lịch",
    subtitle: "Mở đầu cuộc gọi, đặt chỗ",
    phrases: [
      { en: "Hi, this is Dang calling from MA team.", linked: "Hi · this‿is Dang calling from MA team.", vi: "Chào, tôi là Đảng gọi từ team MA.",
        tip: "Trên điện thoại nói \"This is...\" chứ không nói \"I am...\". Thay tên và team của bạn vào nha." },
      { en: "I'd like to book a table for four.", linked: "I'd like to book‿a table for four.", vi: "Tôi muốn đặt bàn cho 4 người.",
        tip: "\"I'd like to...\" lịch sự hơn \"I want\". \"book‿a\" nối thành /bú-cờ/." },
      { en: "Is tomorrow evening okay?", linked: "Is tomorrow‿evening okay?", vi: "Tối mai được không?",
        tip: "Lên giọng ở \"okay\". Đổi \"tomorrow evening\" thành \"Monday morning\", \"next Friday\"…" },
      { en: "Could I speak to Mr. Brown, please?", linked: "Could‿I speak to Mr. Brown, please?", vi: "Cho tôi nói chuyện với ông Brown được không?",
        tip: "Gọi tìm người: \"Could I speak to...?\". Họ có thể trả lời \"Hold on, please\" = chờ chút." },
      { en: "Sorry, you're breaking up.", linked: "Sorry · you're breaking‿up.", vi: "Xin lỗi, tiếng bị rè/ngắt quãng.",
        tip: "Sóng yếu thì nói câu này. \"breaking‿up\" nối thành /brây-kinh-ắp/." },
      { en: "I'll call you back later.", linked: "I'll call‿you back later.", vi: "Lát tôi gọi lại nha.",
        tip: "\"call you back\" = gọi lại. \"call‿you\" nối thành /cô-lừ/." }
    ],
    roleplay: {
      partner: "Restaurant",
      intro: "Bạn gọi điện đặt bàn ăn tối.",
      turns: [
        { them: "Good afternoon, Saigon Kitchen. How can I help you?", them_vi: "Chào buổi chiều, nhà hàng Saigon Kitchen. Tôi giúp gì được ạ?",
          you: "Hi, I'd like to book a table for four.", you_vi: "Chào, tôi muốn đặt bàn 4 người.",
          accept: ["Hi, I'd like to book a table for four.", "I'd like to book a table for four.", "I'd like to book a table for four people."] },
        { them: "Sure. For what time?", them_vi: "Dạ. Mấy giờ ạ?",
          you: "Is tomorrow evening okay? Around seven.", you_vi: "Tối mai được không? Khoảng 7 giờ.",
          accept: ["Is tomorrow evening okay? Around seven.", "Is tomorrow evening okay?", "Tomorrow at seven."] },
        { them: "Yes, that's fine. Can I have your name?", them_vi: "Được ạ. Cho tôi xin tên?",
          you: "It's Dang. Thank you.", you_vi: "Tên Đảng. Cảm ơn.",
          accept: ["It's Dang. Thank you.", "It's Dang.", "My name is Dang."] }
      ]
    }
  },
  {
    id: "l13",
    level: "B1",
    emoji: "📊",
    title: "Họp giao ban: báo tiến độ",
    subtitle: "Đúng tiến độ, trễ, cần hỗ trợ",
    phrases: [
      { en: "Here's a quick update on our progress.", linked: "Here's‿a quick‿update‿on our progress.", vi: "Mình cập nhật nhanh tiến độ nha.",
        tip: "Câu mở đầu báo cáo, gọn và chuyên nghiệp. \"quick‿update‿on\" nối thành /quíc-cắp-đây-đon/." },
      { en: "We're on track for this week.", linked: "We're‿on track for this week.", vi: "Tuần này mình đang đúng tiến độ.",
        tip: "\"on track\" = đúng tiến độ. Ngược lại là \"behind schedule\" = trễ." },
      { en: "We're about two days behind schedule.", linked: "We're‿about two days behind schedule.", vi: "Mình đang trễ khoảng 2 ngày.",
        tip: "Báo trễ thì nói rõ con số. \"schedule\" giọng Mỹ đọc /ské-dzu-ồ/." },
      { en: "The main issue is the material shortage.", linked: "The main‿issue‿is the material shortage.", vi: "Vấn đề chính là thiếu vật tư.",
        tip: "\"The main issue is...\" để nêu nguyên nhân. \"main‿issue‿is\" nối thành /mây-ní-shu-wiz/." },
      { en: "We'll catch up by Friday.", linked: "We'll catch‿up by Friday.", vi: "Tụi mình sẽ bắt kịp trước thứ Sáu.",
        tip: "\"catch up\" = bắt kịp. Luôn kèm hạn chót: by Friday, by the end of the month." },
      { en: "We need support from the purchasing team.", linked: "We need support from the purchasing team.", vi: "Mình cần team mua hàng hỗ trợ.",
        tip: "Nói rõ cần ai, cần gì. \"purchasing\" đọc /pơ-chờ-sinh/." }
    ],
    roleplay: {
      partner: "Manager",
      intro: "Họp giao ban sáng thứ Hai. Quản lý hỏi tiến độ team bạn.",
      turns: [
        { them: "Okay, planning team. How are things going?", them_vi: "Rồi, team kế hoạch. Tình hình sao?",
          you: "Here's a quick update. We're about two days behind schedule.", you_vi: "Mình cập nhật nhanh. Đang trễ khoảng 2 ngày.",
          accept: ["Here's a quick update. We're about two days behind schedule.", "We're about two days behind schedule.", "We're two days behind schedule."] },
        { them: "Why is that?", them_vi: "Sao vậy?",
          you: "The main issue is the material shortage.", you_vi: "Vấn đề chính là thiếu vật tư.",
          accept: ["The main issue is the material shortage.", "The main issue is material shortage.", "We have a material shortage."] },
        { them: "When can you catch up?", them_vi: "Khi nào bắt kịp được?",
          you: "We'll catch up by Friday, but we need support from purchasing.", you_vi: "Trước thứ Sáu sẽ kịp, nhưng cần team mua hàng hỗ trợ.",
          accept: ["We'll catch up by Friday, but we need support from purchasing.", "We'll catch up by Friday.", "By Friday. We need support from the purchasing team."] }
      ]
    }
  },
  {
    id: "l14",
    level: "B1",
    emoji: "🚨",
    title: "Báo sự cố trên chuyền",
    subtitle: "Báo lỗi, nguyên nhân, đề xuất",
    phrases: [
      { en: "We have a problem on line two.", linked: "We have‿a problem‿on line two.", vi: "Chuyền 2 đang có sự cố.",
        tip: "Câu báo động ngắn gọn, nói ngay câu này trước rồi mới giải thích." },
      { en: "The machine stopped about ten minutes ago.", linked: "The machine stopped‿about ten minutes‿ago.", vi: "Máy dừng khoảng 10 phút trước.",
        tip: "\"stopped\" đọc /stopt/, đuôi -ed là /t/. \"minutes‿ago\" nối /mí-nít-sờ-gâu/." },
      { en: "We're checking the cause right now.", linked: "We're checking the cause right now.", vi: "Tụi mình đang kiểm tra nguyên nhân.",
        tip: "\"cause\" đọc /kôz/, khác \"case\" /kêis/. Câu này cho sếp biết bạn đang xử lý." },
      { en: "It looks like a sensor issue.", linked: "It looks like‿a sensor‿issue.", vi: "Có vẻ là lỗi cảm biến.",
        tip: "\"It looks like...\" = có vẻ là, dùng khi chưa chắc 100%. Rất an toàn để nói." },
      { en: "I suggest we switch to the backup machine.", linked: "I suggest we switch to the backup machine.", vi: "Tôi đề xuất chuyển sang máy dự phòng.",
        tip: "\"I suggest we...\" đề xuất lịch sự mà chắc chắn. \"backup\" = dự phòng." },
      { en: "I'll keep you posted.", linked: "I'll keep‿you posted.", vi: "Tôi sẽ cập nhật tiếp cho anh/chị.",
        tip: "Câu kết chuẩn công sở: sẽ báo tiếp. \"keep‿you\" nối thành /kí-pyu/." }
    ],
    roleplay: {
      partner: "Supervisor",
      intro: "Bạn gọi báo cho supervisor về sự cố trên chuyền.",
      turns: [
        { them: "Hello, what's going on?", them_vi: "Alo, có chuyện gì vậy?",
          you: "We have a problem on line two. The machine stopped.", you_vi: "Chuyền 2 có sự cố. Máy dừng rồi.",
          accept: ["We have a problem on line two. The machine stopped.", "We have a problem on line two.", "The machine on line two stopped."] },
        { them: "Do you know why?", them_vi: "Biết nguyên nhân chưa?",
          you: "It looks like a sensor issue. We're checking now.", you_vi: "Có vẻ là lỗi cảm biến. Đang kiểm tra.",
          accept: ["It looks like a sensor issue. We're checking now.", "It looks like a sensor issue.", "We're checking the cause right now."] },
        { them: "What do you suggest?", them_vi: "Bạn đề xuất gì?",
          you: "I suggest we switch to the backup machine. I'll keep you posted.", you_vi: "Đề xuất chuyển sang máy dự phòng. Tôi sẽ báo tiếp.",
          accept: ["I suggest we switch to the backup machine. I'll keep you posted.", "I suggest we switch to the backup machine.", "Switch to the backup machine."] }
      ]
    }
  },
  {
    id: "l10",
    level: "B1",
    emoji: "💬",
    title: "Nêu ý kiến, đồng ý & phản đối khéo",
    subtitle: "I think, good point, I see but…",
    phrases: [
      { en: "In my opinion, we should start earlier.", linked: "In my‿opinion · we should start‿earlier.", vi: "Theo tôi, mình nên bắt đầu sớm hơn.",
        tip: "\"In my opinion\" hoặc \"I think\" để nêu ý. \"start‿earlier\" nối thành /star-đơ-li-ơ/." },
      { en: "That's a good point.", linked: "That's‿a good point.", vi: "Ý hay đó.",
        tip: "Khen ý người khác trước khi nói ý mình, cuộc họp sẽ dễ chịu hơn nhiều." },
      { en: "I see what you mean, but I'm not sure.", linked: "I see what‿you mean · but I'm not sure.", vi: "Tôi hiểu ý bạn, nhưng tôi chưa chắc lắm.",
        tip: "Phản đối KHÉO: công nhận trước, \"but\" sau. Đừng nói thẳng \"No, you're wrong\" nha 😅." },
      { en: "I totally agree with you.", linked: "I totally‿agree with you.", vi: "Tôi hoàn toàn đồng ý.",
        tip: "\"totally\" đọc /tâu-đờ-li/. Đồng ý vừa vừa thì \"I agree\" là đủ." },
      { en: "What if we try a different way?", linked: "What‿if we try‿a different way?", vi: "Hay mình thử cách khác xem?",
        tip: "\"What if...?\" để đề xuất mềm mỏng. \"What‿if\" nối thành /wá-đíp/." },
      { en: "Let's go with that.", linked: "Let's go with that.", vi: "Vậy chốt theo cách đó nha.",
        tip: "Câu chốt khi cả nhóm đã thống nhất. Ngắn mà rất \"sếp\"." }
    ],
    roleplay: {
      partner: "Kate",
      intro: "Kate đề xuất làm thêm giờ cuối tuần. Bạn có ý khác.",
      turns: [
        { them: "I think we should work this Saturday.", them_vi: "Mình nghĩ thứ Bảy này nên làm thêm.",
          you: "I see what you mean, but I'm not sure.", you_vi: "Hiểu ý bạn, nhưng mình chưa chắc lắm.",
          accept: ["I see what you mean, but I'm not sure.", "I see what you mean, but I'm not sure about that.", "That's a good point, but I'm not sure."] },
        { them: "Why not?", them_vi: "Sao vậy?",
          you: "What if we start earlier on weekdays instead?", you_vi: "Hay mình bắt đầu sớm hơn vào ngày thường?",
          accept: ["What if we start earlier on weekdays instead?", "What if we start earlier on weekdays?", "What if we try a different way?"] },
        { them: "Hmm, that could work.", them_vi: "Ừm, vậy cũng được đó.",
          you: "Great. Let's go with that.", you_vi: "Tuyệt. Chốt vậy nha.",
          accept: ["Great. Let's go with that.", "Let's go with that.", "Great, let's do that."] }
      ]
    }
  },
  {
    id: "l11",
    level: "B1",
    emoji: "🧾",
    title: "Phàn nàn, đổi trả",
    subtitle: "Nêu vấn đề, đề nghị, giữ lịch sự",
    phrases: [
      { en: "I'd like to return this, please.", linked: "I'd like to return this, please.", vi: "Tôi muốn trả lại món này.",
        tip: "\"return\" = trả lại, \"exchange\" = đổi. Mang theo hóa đơn: receipt (/ri-xít/, chữ p câm)." },
      { en: "There's a problem with my order.", linked: "There's‿a problem with my‿order.", vi: "Đơn hàng của tôi có vấn đề.",
        tip: "Mở đầu phàn nàn bình tĩnh, nêu vấn đề chứ không đổ lỗi." },
      { en: "It doesn't work properly.", linked: "It doesn't work properly.", vi: "Nó không chạy đúng.",
        tip: "\"doesn't\" đọc /đắ-zờn/. Áp dụng cho máy móc, thiết bị, phần mềm…" },
      { en: "I was charged twice.", linked: "I was charged twice.", vi: "Tôi bị trừ tiền hai lần.",
        tip: "\"charged\" = bị tính tiền. Câu này hay dùng ở khách sạn, nhà hàng, mua online." },
      { en: "Could I get a refund?", linked: "Could‿I get‿a refund?", vi: "Cho tôi hoàn tiền được không?",
        tip: "\"refund\" = hoàn tiền. \"get‿a\" nối thành /gé-đờ/." },
      { en: "I appreciate your help.", linked: "I appreciate your help.", vi: "Cảm ơn bạn đã giúp.",
        tip: "Kết thúc lịch sự dù đang bực, người ta sẽ giúp bạn nhiệt tình hơn 😉." }
    ],
    roleplay: {
      partner: "Clerk",
      intro: "Bạn mang tai nghe bị lỗi ra cửa hàng.",
      turns: [
        { them: "Hi, how can I help you?", them_vi: "Chào, tôi giúp gì được?",
          you: "I'd like to return this. It doesn't work properly.", you_vi: "Tôi muốn trả món này. Nó không chạy đúng.",
          accept: ["I'd like to return this. It doesn't work properly.", "I'd like to return this, please.", "It doesn't work properly."] },
        { them: "I'm sorry. Do you have the receipt?", them_vi: "Xin lỗi anh. Anh có hóa đơn không?",
          you: "Yes, here it is. Could I get a refund?", you_vi: "Có, đây. Hoàn tiền cho tôi được không?",
          accept: ["Yes, here it is. Could I get a refund?", "Could I get a refund?", "Here it is. Can I get a refund?"] },
        { them: "Sure, I'll process that now.", them_vi: "Được, tôi làm ngay.",
          you: "Thank you. I appreciate your help.", you_vi: "Cảm ơn. Rất cảm kích.",
          accept: ["Thank you. I appreciate your help.", "I appreciate your help.", "Thank you so much."] }
      ]
    }
  },
  {
    id: "l16",
    level: "B1",
    emoji: "🛠️",
    title: "Chỉ việc, giải thích quy trình",
    subtitle: "Bước 1, bước 2, lưu ý an toàn",
    phrases: [
      { en: "Let me show you how it works.", linked: "Let me show‿you how‿it works.", vi: "Để tôi chỉ bạn cách làm.",
        tip: "Mở đầu khi hướng dẫn người mới. \"how‿it\" nối thành /hao-wít/." },
      { en: "First, check the part number.", linked: "First · check the part number.", vi: "Đầu tiên, kiểm tra mã linh kiện.",
        tip: "Hướng dẫn dùng câu mệnh lệnh: Check… Scan… Press… Không cần \"you\"." },
      { en: "Then scan the barcode here.", linked: "Then scan the barcode here.", vi: "Sau đó quét mã vạch ở đây.",
        tip: "\"First / Then / Next / Finally\" là bộ khung nói quy trình. Nhớ kèm tay chỉ 😄." },
      { en: "Make sure you wear gloves.", linked: "Make sure‿you wear gloves.", vi: "Nhớ đeo găng tay nha.",
        tip: "\"Make sure...\" = nhớ phải, đảm bảo. Dùng cho mọi lưu ý an toàn." },
      { en: "Don't skip this step.", linked: "Don't skip this step.", vi: "Đừng bỏ qua bước này.",
        tip: "\"Don't\" đọc /đôn/, âm t gần như mất. Nhấn mạnh chữ \"this\"." },
      { en: "Does that make sense?", linked: "Does that make sense?", vi: "Vậy hiểu chưa?",
        tip: "Hỏi lại người nghe một cách lịch sự, thay cho \"Do you understand?\" (nghe hơi như thầy giáo)." }
    ],
    roleplay: {
      partner: "New staff",
      intro: "Bạn hướng dẫn nhân viên mới cách nhận hàng vào kho.",
      turns: [
        { them: "Hi, it's my first day. What should I do?", them_vi: "Chào anh, em mới vào. Em làm gì ạ?",
          you: "Let me show you how it works. First, check the part number.", you_vi: "Để anh chỉ. Đầu tiên kiểm tra mã linh kiện.",
          accept: ["Let me show you how it works. First, check the part number.", "Let me show you how it works.", "First, check the part number."] },
        { them: "Okay. Then what?", them_vi: "Dạ. Rồi sao nữa?",
          you: "Then scan the barcode here. Make sure you wear gloves.", you_vi: "Rồi quét mã vạch ở đây. Nhớ đeo găng tay.",
          accept: ["Then scan the barcode here. Make sure you wear gloves.", "Then scan the barcode here.", "Make sure you wear gloves."] },
        { them: "Got it.", them_vi: "Em hiểu rồi.",
          you: "Great. Does that make sense?", you_vi: "Tốt. Rõ chưa?",
          accept: ["Great. Does that make sense?", "Does that make sense?"] }
      ]
    }
  },
  {
    id: "l12",
    level: "B1",
    emoji: "🤝",
    title: "Giới thiệu công việc & phỏng vấn",
    subtitle: "Bạn làm gì, điểm mạnh, kinh nghiệm",
    phrases: [
      { en: "I've been working here for three years.", linked: "I've been working here for three years.", vi: "Tôi làm ở đây được 3 năm rồi.",
        tip: "\"I've been working... for...\" = đã làm được bao lâu. Khung vàng khi giới thiệu bản thân." },
      { en: "I'm in charge of production planning.", linked: "I'm‿in charge‿of production planning.", vi: "Tôi phụ trách kế hoạch sản xuất.",
        tip: "\"in charge of\" = phụ trách. \"charge‿of\" nối thành /chár-dzờv/." },
      { en: "My main job is to make sure we deliver on time.", linked: "My main job‿is to make sure we deliver‿on time.", vi: "Việc chính của tôi là đảm bảo giao hàng đúng hạn.",
        tip: "Nói việc chính bằng mục tiêu, đừng liệt kê. \"deliver‿on\" nối thành /đi-lí-vơ-ron/." },
      { en: "One of my strengths is problem solving.", linked: "One‿of my strengths‿is problem solving.", vi: "Một điểm mạnh của tôi là giải quyết vấn đề.",
        tip: "\"strengths\" khó đọc nè: /streng-thz/. Nói chậm cũng được, đủ âm cuối là ăn điểm." },
      { en: "For example, I reduced our stock by twenty percent.", linked: "For‿example · I reduced our stock by twenty percent.", vi: "Ví dụ, tôi đã giảm tồn kho 20%.",
        tip: "Luôn kèm ví dụ có con số sau khi khoe điểm mạnh. Thay con số thật của bạn vào nha." },
      { en: "I'm looking forward to working with you.", linked: "I'm looking forward to working with you.", vi: "Rất mong được làm việc cùng anh/chị.",
        tip: "Câu kết phỏng vấn hoặc gặp đối tác mới. \"forward to\" đọc lướt /phó-wờ-tờ/." }
    ],
    roleplay: {
      partner: "Interviewer",
      intro: "Phỏng vấn với quản lý người nước ngoài.",
      turns: [
        { them: "Can you tell me about your current job?", them_vi: "Kể tôi nghe công việc hiện tại của bạn?",
          you: "I'm in charge of production planning. I've been working here for three years.", you_vi: "Tôi phụ trách kế hoạch sản xuất, làm ở đây 3 năm rồi.",
          accept: ["I'm in charge of production planning. I've been working here for three years.", "I'm in charge of production planning.", "I've been working here for three years."] },
        { them: "What are your strengths?", them_vi: "Điểm mạnh của bạn là gì?",
          you: "One of my strengths is problem solving.", you_vi: "Một điểm mạnh là giải quyết vấn đề.",
          accept: ["One of my strengths is problem solving.", "My strength is problem solving.", "Problem solving."] },
        { them: "Great. Any questions for us?", them_vi: "Tốt. Bạn có câu hỏi gì không?",
          you: "Not now. I'm looking forward to working with you.", you_vi: "Hiện chưa. Rất mong được làm việc cùng anh chị.",
          accept: ["Not now. I'm looking forward to working with you.", "I'm looking forward to working with you.", "No, thank you. I'm looking forward to working with you."] }
      ]
    }
  }
];

// Lộ trình: thứ tự bài trên trang chủ
window.ROADMAP = [
  { level: "A2", id: "l1" }, { level: "A2", id: "l2" }, { level: "A2", id: "l15" }, { level: "A2", id: "l3" },
  { level: "A2", id: "l4" }, { level: "A2", id: "l5" }, { level: "A2", id: "l6" }, { level: "A2+", id: "l7" },
  { level: "A2+", id: "l8" }, { level: "A2+", id: "l9" }, { level: "B1", id: "l13" }, { level: "B1", id: "l14" },
  { level: "B1", id: "l10" }, { level: "B1", id: "l11" }, { level: "B1", id: "l16" }, { level: "B1", id: "l12" }
];
