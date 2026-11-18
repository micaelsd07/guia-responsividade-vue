<script setup>
import { ref, reactive, computed, nextTick, onBeforeUnmount } from 'vue'
import BancadaLab from '@/components/guia/BancadaLab.vue'
import CodigoEditor from '@/components/guia/CodigoEditor.vue'
import CampoSegmentado from '@/components/controles/CampoSegmentado.vue'
import { fotos } from '@/data/fotos'
import { gsap, movimentoReduzido } from '@/composables/useMotion'

const foto = fotos.celularMao
const larguraArquivo = 960
const alturaArquivo = Math.round((larguraArquivo * foto.altura) / foto.largura)
const urlFoto = `/img/fotos/${foto.nome}-${larguraArquivo}.webp`

const versoes = [
  { id: 'a', titulo: 'A · sem dimensões', codigo: '<img src="foto.webp" alt="…">' },
  { id: 'b', titulo: 'B · width e height', codigo: `<img src="foto.webp" width="${larguraArquivo}" height="${alturaArquivo}" alt="…">` },
  { id: 'c', titulo: 'C · aspect-ratio', codigo: `.foto { aspect-ratio: ${larguraArquivo} / ${alturaArquivo}; }` },
]

const opcoesRede = [
  { valor: 600, rotulo: 'Rápida · 0,6 s' },
  { valor: 1500, rotulo: '4G · 1,5 s' },
  { valor: 3000, rotulo: '3G lenta · 3 s' },
]

const atraso = ref(1500)
const fase = ref('pronto')
const srcAtual = ref('')
const rodada = ref(0)
const telas = ref({})
const alvos = ref({})
const resultados = reactive({ a: null, b: null, c: null })
let objetoUrl = ''
let temporizador

function guardarTela(id, el) {
  if (el) telas.value[id] = el
}

function guardarAlvo(id, el) {
  if (el) alvos.value[id] = el
}

function retangulo(id) {
  const tela = telas.value[id].getBoundingClientRect()
  const alvo = alvos.value[id].getBoundingClientRect()
  return { topo: alvo.top - tela.top, altura: alvo.height, larguraTela: tela.width, alturaTela: tela.height }
}

function calcularCls(antes, depois) {
  const deslocamento = depois.topo - antes.topo
  if (Math.abs(deslocamento) < 1) return { deslocamento: 0, cls: 0 }
  const topo = Math.max(0, Math.min(antes.topo, depois.topo))
  const base = Math.min(antes.alturaTela, Math.max(antes.topo + antes.altura, depois.topo + depois.altura))
  const fracaoImpacto = Math.max(0, base - topo) / antes.alturaTela
  const fracaoDistancia = Math.abs(deslocamento) / Math.max(antes.larguraTela, antes.alturaTela)
  return { deslocamento: Math.round(deslocamento), cls: fracaoImpacto * fracaoDistancia }
}

function veredito(cls) {
  if (cls <= 0.1) return { tipo: 'bom', texto: 'bom' }
  if (cls <= 0.25) return { tipo: 'medio', texto: 'precisa melhorar' }
  return { tipo: 'ruim', texto: 'ruim' }
}

async function carregar() {
  clearTimeout(temporizador)
  resultados.a = resultados.b = resultados.c = null
  srcAtual.value = ''
  rodada.value++
  fase.value = 'texto'
  await nextTick()
  const antes = Object.fromEntries(versoes.map((v) => [v.id, retangulo(v.id)]))

  const resposta = await fetch(urlFoto, { cache: 'force-cache' })
  const blob = await resposta.blob()
  if (objetoUrl) URL.revokeObjectURL(objetoUrl)
  objetoUrl = URL.createObjectURL(blob)

  temporizador = setTimeout(async () => {
    srcAtual.value = objetoUrl
    fase.value = 'chegou'
    await nextTick()
    await Promise.all(
      versoes.map(
        (v) =>
          new Promise((resolve) => {
            const img = telas.value[v.id]?.querySelector('img')
            if (!img || (img.complete && img.naturalWidth > 0)) return resolve()
            img.addEventListener('load', resolve, { once: true })
            img.addEventListener('error', resolve, { once: true })
          }),
      ),
    )
    await nextTick()
    versoes.forEach((v) => {
      const r = calcularCls(antes[v.id], retangulo(v.id))
      resultados[v.id] = { ...r, veredito: veredito(r.cls) }
      if (r.deslocamento && !movimentoReduzido()) {
        gsap.fromTo(
          alvos.value[v.id],
          { outlineColor: 'rgba(184, 50, 28, 1)', backgroundColor: 'rgba(251, 226, 218, 1)' },
          { outlineColor: 'rgba(184, 50, 28, 0)', backgroundColor: 'rgba(251, 226, 218, 0)', duration: 1.6, ease: 'power2.out' },
        )
      }
    })
    fase.value = 'medido'
  }, atraso.value)
}

function resetar() {
  clearTimeout(temporizador)
  atraso.value = 1500
  srcAtual.value = ''
  fase.value = 'pronto'
  resultados.a = resultados.b = resultados.c = null
}

onBeforeUnmount(() => {
  clearTimeout(temporizador)
  if (objetoUrl) URL.revokeObjectURL(objetoUrl)
})

const piorCls = computed(() => resultados.a?.cls ?? 0)

const codigo = `<!-- A: o navegador não sabe o tamanho até o download terminar -->
<img src="foto.webp" alt="Pessoa lendo no celular">

<!-- B: proporção conhecida desde o HTML; o espaço é reservado -->
<img src="foto.webp" width="${larguraArquivo}" height="${alturaArquivo}" alt="Pessoa lendo no celular">

<!-- C: a caixa já tem proporção pelo CSS -->
<img class="foto" src="foto.webp" alt="Pessoa lendo no celular">
<style>
  .foto { width: 100%; aspect-ratio: ${larguraArquivo} / ${alturaArquivo}; }
</style>`
</script>

<template>
  <BancadaLab
    id="lab-06"
    numero="06"
    titulo="Simulador de CLS"
    resumo="Três versões da mesma notícia, em telas do mesmo tamanho. O texto chega primeiro; a foto chega depois de um atraso de rede. Só uma versão faz o texto pular, e o laboratório mede quanto."
    @reset="resetar"
  >
    <template #controles>
      <CampoSegmentado v-model="atraso" legenda="Velocidade da rede" :opcoes="opcoesRede" :mono="false" />
      <button type="button" class="btn btn--hard" :disabled="fase === 'texto'" @click="carregar">
        {{ fase === 'pronto' ? 'Carregar a página' : fase === 'texto' ? 'Baixando a foto…' : 'Carregar de novo' }}
      </button>
      <ol class="etapas" aria-hidden="true">
        <li :class="{ 'is-feito': fase !== 'pronto' }">1. HTML e texto chegam</li>
        <li :class="{ 'is-feito': fase === 'chegou' || fase === 'medido' }">2. A foto termina de baixar</li>
        <li :class="{ 'is-feito': fase === 'medido' }">3. O laboratório mede o deslocamento</li>
      </ol>
    </template>

    <template #palco>
      <div class="versoes">
        <figure v-for="versao in versoes" :key="versao.id" class="versao">
          <figcaption class="versao__titulo">
            <span class="label">{{ versao.titulo }}</span>
            <code>{{ versao.codigo }}</code>
          </figcaption>
          <div :ref="(el) => guardarTela(versao.id, el)" class="tela">
            <article :key="rodada" class="noticia">
              <p class="noticia__chapeu">Cidade</p>
              <p class="noticia__titulo">Biblioteca pública amplia horário aos sábados</p>
              <img
                v-if="fase !== 'pronto'"
                class="noticia__foto"
                :class="`noticia__foto--${versao.id}`"
                :src="srcAtual || undefined"
                :width="versao.id === 'b' ? larguraArquivo : undefined"
                :height="versao.id === 'b' ? alturaArquivo : undefined"
                :alt="srcAtual ? foto.alt : ''"
              />
              <div :ref="(el) => guardarAlvo(versao.id, el)" class="noticia__depois">
                <p>A partir deste mês, o espaço fica aberto até as 20h, com sala de estudos e empréstimo de notebooks.</p>
                <span class="noticia__botao">Ler a matéria</span>
              </div>
            </article>
          </div>
          <p v-if="resultados[versao.id]" class="versao__medida" :class="`versao__medida--${resultados[versao.id].veredito.tipo}`">
            <span>
              {{ resultados[versao.id].deslocamento ? `Texto desceu ${resultados[versao.id].deslocamento}px` : 'Nada se moveu' }}
            </span>
            <strong>CLS {{ resultados[versao.id].cls.toFixed(3).replace('.', ',') }} · {{ resultados[versao.id].veredito.texto }}</strong>
          </p>
          <p v-else class="versao__medida">aguardando…</p>
        </figure>
      </div>
    </template>

    <template #narracao>
      <p v-if="fase === 'pronto'">Clique em <strong>Carregar a página</strong> e observe o parágrafo e o botão de cada versão.</p>
      <p v-else-if="fase === 'texto'">
        O texto já está na tela. Na versão A, o navegador ainda não sabe a altura da foto e reservou
        <strong>0px</strong>; B e C já guardaram o espaço.
      </p>
      <template v-else>
        <p>
          Na versão A, a foto chegou e <strong>empurrou o texto {{ resultados.a?.deslocamento }}px para baixo</strong>.
          Quem ia tocar em "Ler a matéria" erraria o alvo.
        </p>
        <p>
          O CLS deste quadro é a <strong>fração de impacto</strong> (área da tela afetada) × a
          <strong>fração de distância</strong> (quanto andou em relação à maior dimensão da tela):
          {{ piorCls.toFixed(3).replace('.', ',') }} na versão A, zero nas outras.
        </p>
      </template>
    </template>

    <template #codigo>
      <CodigoEditor arquivo="noticia.html" linguagem="html" :codigo="codigo" />
    </template>
  </BancadaLab>
</template>

<style scoped>
.etapas {
  display: grid;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

.etapas li.is-feito {
  color: var(--color-ok);
}

.versoes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(13rem, 100%), 1fr));
  gap: var(--space-4);
}

.versao {
  display: grid;
  align-content: start;
  gap: var(--space-2);
  min-width: 0;
}

.versao__titulo {
  display: grid;
  gap: var(--space-1);
}

.versao__titulo .label {
  color: var(--color-ink);
}

.versao__titulo code {
  font-size: var(--text-2xs);
  justify-self: start;
}

.tela {
  position: relative;
  height: 22rem;
  overflow: hidden;
  border: 0.5rem solid var(--color-ink);
  border-radius: 1rem;
  background: #fff;
}

.noticia {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-3);
}

.noticia__chapeu {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  text-transform: uppercase;
  color: var(--color-accent);
}

.noticia__titulo {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  font-stretch: 80%;
  line-height: 1.1;
}

.noticia__foto {
  display: block;
  width: 100%;
  height: auto;
  background: var(--color-paper-2);
}

.noticia__foto--c {
  aspect-ratio: 960 / 676;
}

.noticia__depois {
  display: grid;
  gap: var(--space-2);
  justify-items: start;
  font-size: var(--text-sm);
  outline: 0.125rem solid transparent;
  outline-offset: 0.125rem;
}

.noticia__botao {
  padding: var(--space-1) var(--space-3);
  background: var(--color-ink);
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.versao__medida {
  display: grid;
  min-height: 2.75rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}

.versao__medida--ruim {
  color: var(--color-bad);
}

.versao__medida--medio {
  color: var(--color-warn);
}

.versao__medida--bom {
  color: var(--color-ok);
}
</style>
