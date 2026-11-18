import { reactive } from 'vue'

export const ui = reactive({
  gradeVisivel: false,
  menuAberto: false,
})

export function alternarGrade() {
  ui.gradeVisivel = !ui.gradeVisivel
}
