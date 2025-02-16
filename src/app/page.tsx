'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function AppointmentForm() {
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [education, setEducation] = useState<{ degree: string }[]>([]);
    const [showResume, setShowResume] = useState(false);

  
    const addSkill = () => setSkills([...skills, '']);
    const addEducation = () => setEducation([...education, { degree: '' }]);

    const generateResume = (e: React.FormEvent) => {
        e.preventDefault();
        setShowResume(true);
    };
    const saveAsPDF = () => {
      const element = document.getElementById('resume-output');
      if (!element) return;

      html2canvas(element).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
          pdf.save('Appointment_Card.pdf');
      });
  };


    return (
        <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
            <form onSubmit={generateResume} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-[#017EC3]">Take Appointment</h2>
                
                {/* Name */}
                <div className="mb-4">
                    <label className="font-semibold text-gray-700">Name</label>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none" 
                        required 
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="font-semibold text-gray-700">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none" 
                        required 
                    />
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label className="font-semibold text-gray-700">Phone Number</label>
                    <input 
                        type="tel" 
                        placeholder="Phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none" 
                        required 
                    />
                </div>

                {/* Picture */}
              

                {/* Set Date */}
                <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-800">Set Date</h3>
                    {education.map((edu, index) => (
                        <div key={index} className="flex mt-2">
                            <input 
                                type="date" 
                                value={edu.degree} 
                                onChange={(e) => {
                                    const newEdu = [...education];
                                    newEdu[index].degree = e.target.value;
                                    setEducation(newEdu);
                                }} 
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none" 
                                required 
                            />
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={addEducation} 
                        className="mt-2 py-2 px-4 bg-[#9BD1CA] text-black font-bold rounded-lg hover:bg-gray-700 transition"
                    >
                        + Add Date
                    </button>
                </div>

                {/* Set Time */}
                <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-800">Set Time</h3>
                    {skills.map((skill, index) => (
                        <input 
                            key={index} 
                            type="time" 
                            value={skill} 
                            onChange={(e) => {
                                const newSkills = [...skills];
                                newSkills[index] = e.target.value;
                                setSkills(newSkills);
                            }} 
                            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none" 
                            required 
                        />
                    ))}
                    <button 
                        type="button" 
                        onClick={addSkill} 
                        className="mt-2 py-2 px-4 bg-[#9BD1CA] text-black font-bold rounded-lg hover:bg-gray-700 transition"
                    >
                        + Add Time
                    </button>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full mt-4 py-3 bg-[#00796B] text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition"
                >
                    Generate Appointment
                </button>
            </form>

            {showResume && (
    <div id="resume-output" className="bg-white p-6 mt-8 rounded-xl shadow-lg w-full max-w-xl border-t-4 border-[#00796B]">
        <h2 className="text-2xl font-bold text-[#00796B] text-center">Appointment Card</h2>

        {/* Personal Info Section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm border">
            <h4 className="text-lg font-bold text-[#00796B] flex items-center">
                <span className="mr-2">👤</span> Personal Info
            </h4>
            <p className="mt-2 text-gray-700"><strong>Name:</strong> {name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {email}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {phone}</p>
        </div>

        {/* Appointment Info Section */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm border">
            <h4 className="text-lg font-bold text-[#00796B] flex items-center">
                <span className="mr-2">📅</span> Appointment Info
            </h4>

            {/* Date */}
            <h3 className="font-bold text-gray-800 mt-4 flex items-center">
                <span className="mr-2">📆</span> Date
            </h3>
            <ul className="list-disc list-inside pl-4 mt-2 text-gray-700">
                {education.map((edu, index) => (
                    <li key={index} className="py-1 px-2 bg-gray-100 rounded-md">{edu.degree}</li>
                ))}
            </ul>

            {/* Time */}
            <h3 className="font-bold text-gray-800 mt-4 flex items-center">
                <span className="mr-2">⏰</span> Time
            </h3>
            <ul className="list-disc list-inside pl-4 mt-2 text-gray-700">
                {skills.map((skill, index) => (
                    <li key={index} className="py-1 px-2 bg-gray-100 rounded-md">{skill}</li>
                ))}
            </ul>

        </div>
             {/* Save as PDF Button */}
            
    </div>
)}
 <button onClick={saveAsPDF} className="btn mt-4 bg-[#00796B] text-white px-4 py-2 rounded-md font-bold">
                        Save as PDF
                    </button>

        </div>
    );
}
