
import * as Yup from "yup"

Yup.addMethod(Yup.string, "nullIfEmpty", function () {
  return this.transform((val, origVal) => (origVal.trim() === "" ? null : val))
})

Yup.addMethod(Yup.number, "nullIfEmpty", function () {
  return this.transform((val, origVal) => (origVal === "" ? null : val))
})

Yup.addMethod(Yup.array, "nullIfEmpty", function () {
  return this.transform((val, origVal) =>
    origVal && origVal.length && origVal.length === 0 ? null : val,
  )
})
Yup.addMethod(Yup.array, "nullIfEmpty", function () {
  return this.transform((val, origVal) =>
    origVal && origVal.length && origVal.length === 0 ? null : val,
  )
})
Yup.addMethod(Yup.mixed, "nullIfEmpty", function () {
  return this.transform((val, origVal) => origVal || val)
})

export default Yup
