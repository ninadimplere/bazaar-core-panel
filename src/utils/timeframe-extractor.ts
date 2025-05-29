export function createTimeFrameExtractor(
  selectedTimeFrame: string | undefined,
) {
  return (sectionKey: string) => {
    return selectedTimeFrame
      ?.split(",")
      .find((value) => value.includes(sectionKey));
  };
}

export function formatDate(dateString: string, includeTime: boolean = false): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(includeTime && {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }).format(date);
}
