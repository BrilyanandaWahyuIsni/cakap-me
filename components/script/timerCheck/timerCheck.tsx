// merubah format tanggal
export function changeTimeID(timeChange: string) {
  // Membuat objek Date dari string tanggal asli
  const dateObject = new Date(timeChange);

  return dateObject.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}



export function changeTimeIDShort(timeChange: string) {
  const dateObject = new Date(timeChange)

  return dateObject.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "2-digit"
  })
}

export function changeTimeIDShortWithClock(timeChange: string) {
  const dateObject = new Date(timeChange)

  return dateObject.toLocaleDateString("id-ID", {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Jakarta',
  })
}