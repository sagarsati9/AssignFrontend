const addUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    const data = await response.json();
    console.log("User added:", data);
  } catch (error) {
    console.error("Error adding user:", error.message);
  }
};
