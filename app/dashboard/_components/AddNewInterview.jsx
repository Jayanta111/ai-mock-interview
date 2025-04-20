"use client";

import React, { useState } from 'react';

function AddNewInterview() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [resume, setResume] = useState(null);
  const [jobPosition, setJobPosition] = useState("");  // Fixed typo here
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");

  const toggleDialog = () => setOpen(!open);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("jobPosition", jobPosition);  // Fixed typo here
    formData.append("jobDescription", jobDescription);
    formData.append("jobExperience", jobExperience);
    formData.append("resume", resume);

    try {
      const res = await fetch("/utils/GeminiModel", {  // Adjust API endpoint as needed
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to generate questions");
      }

      const data = await res.json();
      const parsed = JSON.parse(data.questions);  // Assuming the response is a JSON string
      setQuestions(parsed);
      setModalOpen(true);
    } catch (err) {
      console.error("Error generating questions:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setJobPosition("");  // Reset state after submission
      setJobDescription("");
      setJobExperience("");
      setResume(null);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer"
        onClick={toggleDialog}
      >
        <h1 className="font-s text-lg text-center transition-all">
          + Add New
        </h1>
      </div>

      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 bg-secondary bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Interview</h2>
            <p className="text-gray-700 mb-4">Tell us about your job role and your interview experience.</p>

            <form onSubmit={handleSubmit}>

              {/* Position */}
              <input
                type="text"
                placeholder="Job Position"
                className="w-full p-2 mb-3 border rounded"
                value={jobPosition}  // Fixed typo here
                onChange={(e) => setJobPosition(e.target.value)}  // Fixed typo here
                required
              />

              {/* Experience */}
              <input
                type="number"
                placeholder="Years of Experience (e.g., 0-5)"
                className="w-full p-2 mb-3 border rounded"
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
                required
              />

              {/* Description */}
              <textarea
                placeholder="Job Description"
                className="w-full p-2 mb-3 border rounded"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />

              {/* Resume Upload */}
              <div className="mb-3">
                <label className="block mb-1 font-medium">Upload Resume</label>
                <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block">
                  Choose File
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    required
                  />
                </label>
                {resume && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {resume.name}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={toggleDialog}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {loading ? "Generating..." : "Start"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNewInterview;
