"use client";

export default function ContactInfo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1f0a38] to-[#5c2f8b] px-4 py-10 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-pink-400">ติดต่อเรา</h2>
        <div className="bg-white bg-opacity-20 rounded-lg p-4 space-y-4 text-sm">
          <div>
            <p className="font-semibold text-white">📞 เบอร์โทรศัพท์:</p>
            <ul className="ml-4 list-disc">
              <li>096-697-8134</li>
              <li>087-165-4075</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">📘 Facebook:</p>
            <ul className="ml-4 list-disc">
              
                
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
