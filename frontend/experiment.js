const jsPsych = initJsPsych({
    display_element: "jspsych-target",
  
    on_finish: function () {
      console.log("Experiment finished.");
    },
  });
  
  
  // ========================================
  // Timeline
  // ========================================
  
  const timeline = [];
  
  
  // ========================================
  // Welcome
  // ========================================
  
  const welcome = {
    type: jsPsychHtmlKeyboardResponse,
  
    stimulus: `
      <div class="min-h-screen flex items-center justify-center px-6">
        
        <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            به آزمایش 2-Back خوش آمدید
          </h1>
  
          <p class="text-lg leading-9 text-gray-600 mb-8">
            در این آزمایش، تعدادی حرف به صورت پشت سر هم
            روی صفحه نمایش داده می‌شوند.
          </p>
  
          <p class="text-lg leading-9 text-gray-600 mb-8">
            لازم است با دقت به حروف توجه کنید و قوانین آزمایش
            را در طول انجام آن رعایت کنید.
          </p>
  
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
            <p class="text-blue-800 leading-8">
              قبل از شروع آزمایش، لطفاً دستورالعمل‌های مرحله بعد
              را با دقت مطالعه کنید.
            </p>
          </div>
  
          <p class="text-gray-500">
            برای ادامه، یک کلید از صفحه‌کلید را فشار دهید.
          </p>
  
        </div>
  
      </div>
    `,
  
    choices: "ALL_KEYS",
  };
  
  timeline.push(welcome);
  
  
  // ========================================
  // Instructions
  // ========================================
  
  const instructions = {
    type: jsPsychHtmlKeyboardResponse,
  
    stimulus: `
      <div class="min-h-screen flex items-center justify-center px-6">
        
        <div class="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-12">
          
          <h2 class="text-3xl font-bold text-gray-800 text-center mb-8">
            دستورالعمل آزمایش
          </h2>
  
          <div class="space-y-6 text-lg leading-9 text-gray-700">
  
            <p>
              در هر مرحله، حروف یکی‌یکی روی صفحه نمایش داده می‌شوند.
            </p>
  
            <p>
              وظیفه شما این است که بررسی کنید آیا
              <span class="font-bold text-blue-600">
                حرف فعلی
              </span>
              با حرفی که
              <span class="font-bold text-blue-600">
                دو جایگاه قبل
              </span>
              نمایش داده شده است، یکسان است یا خیر.
            </p>
  
            <div class="bg-green-50 border border-green-200 rounded-xl p-5">
              <p class="text-green-800">
                اگر حرف فعلی با حرف دو جایگاه قبل یکسان بود،
                کلید
                <span class="font-bold">
                  Space
                </span>
                را فشار دهید.
              </p>
            </div>
  
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <p class="text-gray-700">
                اگر حرف فعلی با حرف دو جایگاه قبل یکسان نبود،
                هیچ کلیدی را فشار ندهید.
              </p>
            </div>
  
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
  
              <p class="font-bold text-blue-800 mb-4">
                مثال:
              </p>
  
              <div class="flex justify-center items-center gap-6 text-3xl font-bold text-gray-800" dir="ltr">
                <span>A</span>
                <span>→</span>
                <span>B</span>
                <span>→</span>
                <span>A</span>
              </div>
  
              <p class="mt-5 text-blue-800 leading-8">
                حرف سوم با حرف اول یکسان است؛
                بنابراین باید کلید
                <span class="font-bold">
                  Space
                </span>
                را فشار دهید.
              </p>
  
            </div>
  
            <p class="text-center text-gray-500 pt-4">
              برای شروع آزمایش، یک کلید از صفحه‌کلید را فشار دهید.
            </p>
  
          </div>
  
        </div>
  
      </div>
    `,
  
    choices: "ALL_KEYS",
  };
  
  timeline.push(instructions);
  
  
  // ========================================
  // Run Experiment
  // ========================================
  
  jsPsych.run(timeline);