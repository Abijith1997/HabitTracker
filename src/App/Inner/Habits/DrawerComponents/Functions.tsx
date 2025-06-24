export const setRowClass = (color: string) => {
  switch (color) {
    case "red":
      return "bg-red-500/20 hover:bg-red-500/40";
    case "green":
      return "bg-green-500/20 hover:bg-green-500/30";
    case "blue":
      return "bg-blue-500/20 hover:bg-blue-500/30";
    case "yellow":
      return "bg-yellow-500/20 hover:bg-yellow-500/30";
    case "purple":
      return "bg-purple-500/20 hover:bg-purple-500/30";
    default:
      return "bg-transparent";
  }
};

export const handleSelectedRows = (color: string) => {
  switch (color) {
    case "red":
      return "bg-red-500/50 hover:bg-red-500/20";
    case "green":
      return "bg-green-500/50 hover:bg-green-500/30";
    case "blue":
      return "bg-blue-500/50 hover:bg-blue-500/30";
    case "yellow":
      return "bg-yellow-500/50 hover:bg-yellow-500/30";
    case "purple":
      return "bg-purple-500/50 hover:bg-purple-500/30";
    default:
      return "bg-transparent";
  }
};
