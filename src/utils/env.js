const firebaseFuncPord = "https://geocode-axojyswcaq-uc.a.run.app"
const firebaseFuncDev = "http://0.0.0.0:5001/mealstogo-3b93d/us-central1"
const isDevelopment = process.env.NODE_ENV === 'development' 

// export const host = isDevelopment ? firebaseFuncDev : firebaseFuncPord

// Android doesn't support http so localhost cannot work
export const host = firebaseFuncPord 