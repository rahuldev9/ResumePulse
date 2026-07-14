export const compareResumes = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Compare API Working",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
