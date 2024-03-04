const getHighlightedText = (text: string, highlight: string) => {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part: string, index: number) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span className='bg-yellow-500 rounded-md p-1 py-[2px]' key={index}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
};
export default getHighlightedText;
