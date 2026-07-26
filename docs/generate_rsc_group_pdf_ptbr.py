#!/usr/bin/env python3
"""Gera PDF RSC Group — overview para investidores e empresas (Português Brasil)."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, Flowable,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from datetime import datetime
import os

FONT_DIR = "/usr/share/fonts/truetype/dejavu"
pdfmetrics.registerFont(TTFont("DejaVu", os.path.join(FONT_DIR, "DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("DejaVuBold", os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf")))
pdfmetrics.registerFont(TTFont("DejaVuOblique", os.path.join(FONT_DIR, "DejaVuSans-Oblique.ttf")))

NAVY = HexColor("#081A33")
NAVY_MID = HexColor("#0F2A4A")
ACCENT = HexColor("#2B6CB0")
SLATE = HexColor("#334155")
MUTED = HexColor("#64748B")
LIGHT_BG = HexColor("#F5F7FA")
BORDER = HexColor("#E2E8F0")

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm

OUTPUT = os.path.join(
    os.path.dirname(__file__),
    "RSC_Group_Overview_Investidores_Empresas_PT-BR.pdf",
)


class ColoredBox(Flowable):
    def __init__(self, title, subtitle="", height=28 * mm, bg=NAVY, title_size=16, sub_size=9):
        Flowable.__init__(self)
        self.title = title
        self.subtitle = subtitle
        self.box_height = height
        self.bg = bg
        self.title_size = title_size
        self.sub_size = sub_size
        self.width = PAGE_W - 2 * MARGIN

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (self.width, self.box_height)

    def draw(self):
        self.canv.setFillColor(self.bg)
        self.canv.roundRect(0, 0, self.width, self.box_height, 4, fill=1, stroke=0)
        self.canv.setFillColor(white)
        self.canv.setFont("DejaVuBold", self.title_size)
        y = self.box_height - 12 * mm if self.subtitle else self.box_height / 2 - 3
        self.canv.drawString(8 * mm, y, self.title)
        if self.subtitle:
            self.canv.setFont("DejaVu", self.sub_size)
            self.canv.setFillColor(HexColor("#A8C0D8"))
            self.canv.drawString(8 * mm, y - 6 * mm, self.subtitle)


class SectionBar(Flowable):
    def __init__(self, number, title):
        Flowable.__init__(self)
        self.number = number
        self.title = title
        self.h = 12 * mm

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (self.width, self.h)

    def draw(self):
        c = self.canv
        c.setFillColor(NAVY)
        c.rect(0, 2 * mm, 2.5 * mm, 8 * mm, fill=1, stroke=0)
        c.setFillColor(ACCENT)
        c.setFont("DejaVuBold", 8)
        c.drawString(6 * mm, 6.5 * mm, self.number)
        c.setFillColor(NAVY)
        c.setFont("DejaVuBold", 13)
        c.drawString(18 * mm, 5.5 * mm, self.title)
        c.setStrokeColor(BORDER)
        c.setLineWidth(0.5)
        c.line(0, 1 * mm, self.width, 1 * mm)


def make_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name="H1", fontName="DejaVuBold", fontSize=16, leading=20,
        textColor=NAVY, spaceBefore=10, spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name="H2", fontName="DejaVuBold", fontSize=12, leading=16,
        textColor=NAVY_MID, spaceBefore=10, spaceAfter=5,
    ))
    styles.add(ParagraphStyle(
        name="Body", fontName="DejaVu", fontSize=9.5, leading=14,
        textColor=SLATE, alignment=TA_JUSTIFY, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="BodyCenter", fontName="DejaVu", fontSize=9.5, leading=14,
        textColor=SLATE, alignment=TA_CENTER, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="BulletBody", fontName="DejaVu", fontSize=9.2, leading=13.5,
        textColor=SLATE, leftIndent=4, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="Callout", fontName="DejaVuOblique", fontSize=10, leading=15,
        textColor=NAVY, alignment=TA_CENTER, spaceBefore=6, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="TOCEntry", fontName="DejaVu", fontSize=10, leading=16,
        textColor=SLATE, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="TOCNum", fontName="DejaVuBold", fontSize=10, leading=16,
        textColor=ACCENT,
    ))
    styles.add(ParagraphStyle(
        name="TableHead", fontName="DejaVuBold", fontSize=8.5, leading=11,
        textColor=white, alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="TableCell", fontName="DejaVu", fontSize=8.2, leading=11,
        textColor=SLATE, alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="Small", fontName="DejaVu", fontSize=8, leading=11,
        textColor=MUTED, alignment=TA_JUSTIFY, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="ProductName", fontName="DejaVuBold", fontSize=11, leading=14,
        textColor=NAVY, spaceBefore=2, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        name="Tagline", fontName="DejaVuOblique", fontSize=9, leading=12,
        textColor=ACCENT, spaceAfter=4,
    ))
    return styles


def bullets(items, styles):
    flow = []
    for item in items:
        flow.append(Paragraph(f"•  {item}", styles["BulletBody"]))
    flow.append(Spacer(1, 3 * mm))
    return flow


def info_table(rows, styles, col_widths=None):
    data = []
    header = [Paragraph(c, styles["TableHead"]) for c in rows[0]]
    data.append(header)
    for row in rows[1:]:
        data.append([Paragraph(str(c), styles["TableCell"]) for c in row])
    if col_widths is None:
        n = len(rows[0])
        usable = PAGE_W - 2 * MARGIN
        col_widths = [usable / n] * n
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("BACKGROUND", (0, 1), (-1, -1), white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, LIGHT_BG]),
        ("GRID", (0, 0), (-1, -1), 0.4, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def product_card(name, tagline, description, points, styles):
    parts = [
        Paragraph(name, styles["ProductName"]),
        Paragraph(tagline, styles["Tagline"]),
        Paragraph(description, styles["Body"]),
    ]
    parts.extend(bullets(points, styles))
    return KeepTogether(parts)


def add_page_number(canv, doc):
    canv.saveState()
    page = doc.page
    if page == 1:
        canv.restoreState()
        return
    canv.setFillColor(NAVY)
    canv.rect(0, PAGE_H - 8 * mm, PAGE_W, 8 * mm, fill=1, stroke=0)
    canv.setFillColor(white)
    canv.setFont("DejaVu", 7)
    canv.drawString(
        MARGIN, PAGE_H - 5.2 * mm,
        "RSC GROUP  ·  Documento corporativo para investidores e empresas (PT-BR)",
    )
    canv.setFillColor(LIGHT_BG)
    canv.rect(0, 0, PAGE_W, 10 * mm, fill=1, stroke=0)
    canv.setFillColor(MUTED)
    canv.setFont("DejaVu", 7.5)
    canv.drawString(MARGIN, 4 * mm, "Confidencial — Uso informativo  |  rscgroup.com  ·  rscchain.com")
    canv.drawRightString(PAGE_W - MARGIN, 4 * mm, f"{page}")
    canv.setStrokeColor(ACCENT)
    canv.setLineWidth(1.5)
    canv.line(0, 10 * mm, PAGE_W, 10 * mm)
    canv.restoreState()


def build():
    styles = make_styles()
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=14 * mm,
        bottomMargin=16 * mm,
        title="RSC Group — Overview para Investidores e Empresas (PT-BR)",
        author="RSC Group",
        subject="Documento corporativo do ecossistema RSC Group",
    )

    story = []
    year = datetime.now().year

    # CAPA
    story.append(Spacer(1, 25 * mm))
    story.append(ColoredBox(
        "RSC GROUP",
        "Building the Next Generation of Digital Platforms",
        height=42 * mm,
        title_size=26,
        sub_size=11,
    ))
    story.append(Spacer(1, 12 * mm))
    story.append(Paragraph("Documento corporativo de apresentação", styles["H1"]))
    story.append(Paragraph(
        "O que é a RSC Group, como funciona seu ecossistema e o que faz cada um dos seus "
        "componentes — preparado para investidores, parceiros estratégicos, empresas e instituições.",
        styles["Body"],
    ))
    story.append(Spacer(1, 8 * mm))

    meta_rows = [
        ["Tipo de documento", "Overview corporativo / Investment briefing"],
        ["Público", "Investidores · Empresas · Instituições · Partners"],
        ["Idioma", "Português (Brasil)"],
        ["Versão", f"{year}.1-PT-BR"],
        ["Sites", "rscgroup.com  ·  rscchain.com"],
        ["Redes", "@Reeskcap  ·  t.me/RSCchain  ·  github.com/rscchain"],
    ]
    meta_data = [[
        Paragraph(f"<b>{r[0]}</b>", styles["TableCell"]),
        Paragraph(r[1], styles["TableCell"]),
    ] for r in meta_rows]
    mt = Table(meta_data, colWidths=[45 * mm, 125 * mm])
    mt.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
        ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, BORDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(mt)
    story.append(Spacer(1, 14 * mm))
    story.append(Paragraph(
        "«Não construímos apps. Construímos ecossistemas digitais.»",
        styles["Callout"],
    ))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(
        "Este documento descreve a arquitetura de negócio e de produto da RSC Group: "
        "Reeskova (real estate), RSC Chain (infraestrutura blockchain), RSC Wallet, "
        "pagamentos, P2P, Escrow, Corporate, Mining, o token REESK (RSK) e as suites para "
        "empresas, instituições e desenvolvedores.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # ÍNDICE
    story.append(SectionBar("00", "Índice"))
    story.append(Spacer(1, 4 * mm))
    toc = [
        ("01", "Resumo executivo"),
        ("02", "O que é a RSC Group"),
        ("03", "Visão, missão e filosofia"),
        ("04", "Mapa do ecossistema"),
        ("05", "Reeskova — Real Estate"),
        ("06", "RSC Chain — Infraestrutura blockchain"),
        ("07", "RSC Wallet e produtos para indivíduos"),
        ("08", "Suite empresarial (Business)"),
        ("09", "RSC P2P e RSC Escrow"),
        ("10", "RSC Corporate"),
        ("11", "REESK (RSK) — Token nativo"),
        ("12", "Mining, staking e recompensas"),
        ("13", "Plataforma para desenvolvedores"),
        ("14", "Segurança e conformidade"),
        ("15", "Arquitetura tecnológica"),
        ("16", "Públicos e casos de uso"),
        ("17", "Proposta de valor para investidores"),
        ("18", "Proposta de valor para empresas"),
        ("19", "Roadmap e trajetória"),
        ("20", "Contato e próximos passos"),
        ("A", "Anexo — Glossário rápido"),
    ]
    for num, title in toc:
        row = Table([[
            Paragraph(num, styles["TOCNum"]),
            Paragraph(title, styles["TOCEntry"]),
        ]], colWidths=[14 * mm, 155 * mm])
        row.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ("TOPPADDING", (0, 0), (-1, -1), 1),
            ("LINEBELOW", (0, 0), (-1, -1), 0.3, BORDER),
        ]))
        story.append(row)
    story.append(PageBreak())

    # 01
    story.append(SectionBar("01", "Resumo executivo"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "A RSC Group é uma empresa de tecnologia multiproduto que constrói plataformas digitais "
        "para imobiliário, finanças digitais, transações seguras e infraestrutura "
        "descentralizada. Não é um único produto: é um stack integrado sob a mesma "
        "marca corporativa e uma infraestrutura compartilhada (RSC Chain).",
        styles["Body"],
    ))
    story.append(Paragraph(
        "A tese central é simples: <b>uma empresa, múltiplas plataformas</b>. Cada produto "
        "funciona de forma independente e fica mais forte quando se conecta ao restante do "
        "ecossistema — wallet, pagamentos, escrow, P2P, real estate e serviços corporativos "
        "compartilham trilhos, identidade e liquidação.",
        styles["Body"],
    ))
    story.append(Paragraph("Pilares do negócio", styles["H2"]))
    pillars = [
        ["Pilar", "Descrição", "Benefício-chave"],
        ["Reeskova", "Marketplace imobiliário digital com IA, listings verificados e fluxos prontos para escrow", "Entrada em real estate e capital"],
        ["RSC Chain", "Infraestrutura blockchain enterprise (alto TPS, finality rápida, compliance)", "Trilhos de liquidação compartilhados"],
        ["Finanças digitais", "Wallet, QR payments, remessas, staking, mining", "Adoção retail e engajamento"],
        ["Mercados & confiança", "P2P institucional + Escrow digital", "Liquidação segura B2B/B2C"],
        ["Enterprise", "RSC Corporate: consultoria, redes privadas, integrações ERP/CRM", "Receita B2B / institucional"],
        ["Token REESK (RSK)", "Utilidade nativa: fees, staking, governança, participação", "Alinhamento econômico do ecossistema"],
    ]
    story.append(info_table(pillars, styles, [32 * mm, 95 * mm, 43 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Sinais de plataforma (objetivos de design)", styles["H2"]))
    metrics = [
        ["Métrica", "Objetivo", "Significado"],
        ["Throughput", "10.000+ TPS (objetivo)", "Capacidade para carga institucional"],
        ["Confirmação", "< 2 segundos (objetivo)", "UX de pagamentos e liquidação"],
        ["Disponibilidade", "99,9% – 99,99%", "Operação contínua"],
        ["Modelo de custódia", "Non-custodial", "O usuário controla suas chaves"],
        ["Cobertura de produto", "10+ produtos / módulos", "Portfólio multiproduto"],
    ]
    story.append(info_table(metrics, styles, [40 * mm, 50 * mm, 80 * mm]))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Nota: as cifras de desempenho representam objetivos de design e capacidade de plataforma "
        "comunicados na documentação de produto; devem ser validados no contexto de cada "
        "implantação e due diligence técnica.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # 02
    story.append(SectionBar("02", "O que é a RSC Group"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "A RSC Group é a marca matriz (holding de tecnologia) por trás de um portfólio de "
        "plataformas digitais. Sua proposta não se limita a “mais uma wallet” ou “mais uma "
        "chain”: organiza produtos verticais (imobiliário, pagamentos, trading P2P, escrow) "
        "sobre uma camada horizontal de infraestrutura, segurança, APIs e dados.",
        styles["Body"],
    ))
    story.append(Paragraph("Posicionamento", styles["H2"]))
    story.append(Paragraph(
        "<b>Tagline:</b> Building the Next Generation of Digital Platforms.<br/>"
        "<b>Manifesto:</b> Não construímos apps. Construímos ecossistemas digitais.<br/>"
        "<b>Cor da marca:</b> Navy #081A33 — sobriedade institucional, não estética de hype crypto.",
        styles["Body"],
    ))
    story.append(Paragraph("Qual problema resolve", styles["H2"]))
    story.extend(bullets([
        "Fragmentação das finanças digitais: wallet, pagamentos, remessas e staking vivem em silos.",
        "Fricção cross-border e remessas: intermediários, custos opacos e demoras.",
        "Necessidade institucional de trilhos: P2P, escrow, compliance e redes privadas.",
        "Real estate digital: descoberta, confiança, listings verificados e settlement seguro.",
        "Participação na rede: mining, indicações, staking e utilidade do token nativo.",
    ], styles))
    story.append(Paragraph("Marcas do grupo", styles["H2"]))
    brands = [
        ["Marca", "Papel"],
        ["RSC Group", "Empresa matriz / marca corporativa (rscgroup.com)"],
        ["Reeskova", "Produto estrela de real estate digital"],
        ["RSC Chain", "Infraestrutura blockchain e marca crypto (rscchain.com)"],
        ["REESK / RSK / wRSK", "Token nativo (e representação em venda BSC quando aplicável)"],
        ["RSC Wallet / RSC Mining", "Produtos consumer de ativos e participação na rede"],
    ]
    story.append(info_table(brands, styles, [45 * mm, 125 * mm]))
    story.append(PageBreak())

    # 03
    story.append(SectionBar("03", "Visão, missão e filosofia"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Visão", styles["H2"]))
    story.append(Paragraph(
        "Criar um ecossistema financeiro descentralizado que empodere indivíduos e instituições "
        "em todo o mundo, tornando os serviços financeiros acessíveis, transparentes e seguros "
        "para todos.",
        styles["Body"],
    ))
    story.append(Paragraph("Missão", styles["H2"]))
    story.append(Paragraph(
        "Construir e manter a infraestrutura da RSC Chain, oferecendo soluções blockchain "
        "inovadoras que permitam transações financeiras seguras, rápidas e rentáveis, enquanto "
        "se promove a inclusão financeira e se habilitam plataformas digitais de nova geração "
        "(incluindo real estate com a Reeskova).",
        styles["Body"],
    ))
    story.append(Paragraph("Filosofia", styles["H2"]))
    phil = [
        ["Princípio", "O que significa na prática"],
        ["Descentralização", "Sistemas mais transparentes, justos e resilientes; menos pontos únicos de falha."],
        ["Segurança em primeiro lugar", "Proteção de fundos e dados acima da velocidade de features."],
        ["Inovação aberta", "Developers, empresas e instituições podem construir e integrar juntos."],
    ]
    story.append(info_table(phil, styles, [45 * mm, 125 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Valores de liderança", styles["H2"]))
    story.extend(bullets([
        "Inovação — produtos com ambição tecnológica real.",
        "Integridade — comunicação clara com usuários, partners e investidores.",
        "Tecnologia — blockchain é uma camada; o stack inclui IA, cloud, analytics e APIs.",
        "Confiança — escrow, verificação e non-custodial como design, não marketing.",
        "Execução — roadmap sequenciado: produtos estrela → expansão global.",
    ], styles))
    story.append(PageBreak())

    # 04
    story.append(SectionBar("04", "Mapa do ecossistema"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "A RSC Group está no centro. Os produtos se expandem como órbita e se reconectam "
        "por meio de infraestrutura compartilhada (cadeia, APIs, segurança, identidade).",
        styles["Body"],
    ))
    eco = [
        ["Componente", "Categoria", "Função principal"],
        ["Reeskova", "Real Estate", "Marketplace: comprar, vender, alugar, investir"],
        ["RSC Chain", "Infraestrutura", "Blockchain enterprise, liquidação, consenso"],
        ["RSC Wallet", "Consumer Finance", "Ativos non-custodial, enviar/receber, QR, staking"],
        ["Pagamentos & QR", "Payments", "Cobranças e pagamentos cotidianos com status claros"],
        ["Remessas", "Payments", "Transferências cross-border P2P"],
        ["Business Wallet / API", "B2B", "Cobranças, papéis, reporting, integração POS/e-commerce"],
        ["RSC P2P", "Markets", "Trading peer-to-peer institucional / marketplace"],
        ["RSC Escrow", "Trust", "Custódia condicional até cumprimento de condições"],
        ["RSC Corporate", "Enterprise", "Consultoria, redes privadas, suporte 24/7"],
        ["REESK (RSK)", "Tokenomics", "Fees, staking, governança, utilidade de rede"],
        ["Mining & Rewards", "Participation", "Participação mobile, indicações, eventos"],
        ["Developer Platform", "Builders", "Docs, APIs/SDKs, testnet, faucet, roadmap"],
    ]
    story.append(info_table(eco, styles, [40 * mm, 35 * mm, 95 * mm]))
    story.append(Spacer(1, 5 * mm))
    story.append(Paragraph("Como tudo se conecta", styles["H2"]))
    story.append(Paragraph(
        "A wallet é a porta de entrada do consumidor. A RSC Chain coordena identidade, pagamentos, "
        "utilidades e o roadmap em direção a bridge e experiências de pagamento de grau bancário. "
        "A Reeskova aporta a vertical imobiliária e se apoia nas capacidades do grupo "
        "(IA, analytics, escrow-ready, blockchain-ready). P2P e Escrow aportam trilhos de "
        "confiança para instituições e operações de alto valor. Corporate fecha o ciclo "
        "enterprise com redes privadas e integrações.",
        styles["Body"],
    ))
    story.append(Paragraph(
        "Camadas tecnológicas transversais: Blockchain · Inteligência Artificial · Cloud · "
        "Segurança · Data Analytics · APIs · Plataforma aberta.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 05
    story.append(SectionBar("05", "Reeskova — Real Estate"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("O futuro do real estate", styles["Tagline"]))
    story.append(Paragraph(
        "A Reeskova é o marketplace imobiliário emblemático da RSC Group. Permite comprar, vender, "
        "alugar e investir por meio de uma plataforma digital premium desenhada para a próxima "
        "geração de propriedades e capital. Não é um classificado estático: roda sobre "
        "tecnologia do grupo (IA, big data, cloud, analytics, escrow-ready e blockchain-ready).",
        styles["Body"],
    ))
    story.append(Paragraph("Proposta de valor", styles["H2"]))
    story.extend(bullets([
        "AI Search — encontra imóveis conforme estilo de vida e intenção de investimento.",
        "Verified Listings — destaques revisados para avançar com confiança.",
        "Secure Transactions — negociações mais seguras e fluxos prontos para escrow.",
        "Smart Investment — sinais e analytics sem ruído para avaliar oportunidade.",
        "Mapa interativo — descoberta geográfica premium com filtros (comprar / alugar / investir).",
    ], styles))
    story.append(Paragraph("Jornada do usuário", styles["H2"]))
    journey = [
        ["Etapa", "Ação", "Resultado"],
        ["1. Search", "Filtros assistidos por IA + mapa ao vivo", "Shortlist relevante"],
        ["2. Visit", "Agenda visitas com profissionais de confiança", "Validação física"],
        ["3. Negotiate", "Conversas e propostas em fluxo premium", "Oferta estruturada"],
        ["4. Secure Deal", "Infraestrutura transacional mais segura", "Fechamento com confiança"],
        ["5. Move In", "Fechamento com clareza", "Novo capítulo / ativo"],
    ]
    story.append(info_table(journey, styles, [30 * mm, 75 * mm, 65 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Públicos", styles["H2"]))
    story.extend(bullets([
        "Buyers — exploração, comparação e contato com experiência de produto moderna.",
        "Agents — leads qualificados, storytelling premium de listings, alinhamento CRM.",
        "Developers — spotlight de lançamentos, mídia rica e pipeline comercial.",
        "Investors — framing de ROI, rentabilidade e crescimento com sobriedade institucional.",
    ], styles))
    story.append(Paragraph(
        "A Reeskova fortalece a marca matriz RSC Group sem distrair quem busca moradia, "
        "e deixa espaço para o próximo produto do ecossistema (P2P, Escrow, soluções "
        "financeiras futuras).",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 06
    story.append(SectionBar("06", "RSC Chain — Infraestrutura blockchain"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Infraestrutura blockchain empresarial", styles["Tagline"]))
    story.append(Paragraph(
        "A RSC Chain é a infraestrutura blockchain de alto desempenho desenhada para uso "
        "institucional. Combina segurança de nível empresarial, escalabilidade e recursos "
        "de conformidade para habilitar aplicações financeiras e de liquidação em escala.",
        styles["Body"],
    ))
    story.append(Paragraph("Características principais", styles["H2"]))
    story.extend(bullets([
        "Alto desempenho — otimizada para alto throughput e baixa latência.",
        "Segurança empresarial — arquitetura multicamada e gestão de chaves institucional.",
        "Conformidade regulatória — orientação KYC/AML e capacidades de reporting.",
        "Finalidade rápida — confirmação com finalidade determinística para liquidação.",
        "Tolerância a falhas bizantinas — resiliência ante falhas e atores maliciosos.",
    ], styles))
    story.append(Paragraph("Arquitetura em camadas", styles["H2"]))
    layers = [
        ["Camada", "Responsabilidade"],
        ["Consenso", "Segurança da rede e finalidade das transações"],
        ["Execução", "Ambiente de alto desempenho para contratos e transações complexas"],
        ["Aplicação", "APIs e ferramentas para builders e instituições"],
    ]
    story.append(info_table(layers, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Casos de uso institucionais", styles["H2"]))
    story.extend(bullets([
        "CBDC / moedas digitais de banco central — compliance, throughput, auditabilidade.",
        "Pagamentos transfronteiriços — liquidação rápida, custos reduzidos, disponibilidade 24/7.",
        "Infraestrutura de ativos digitais — tokenização, DeFi institucional, smart contracts.",
    ], styles))
    story.append(Paragraph("Documentação técnica (GitBook)", styles["H2"]))
    story.append(Paragraph(
        "A documentação da RSC Chain descreve, entre outros módulos: arquitetura, IA integrada, "
        "segurança (incluindo criptografia pós-quântica e ZKP na narrativa técnica), "
        "consenso híbrido (PoW/PoS/VRF), rede P2P (Kademlia, Gossip, QUIC/Noise), armazenamento, "
        "APIs REST/WebSocket, monitoramento e casos de uso setoriais (DeFi, gaming, healthcare, "
        "supply chain, government).",
        styles["Body"],
    ))
    story.append(Paragraph(
        "Para investidores: a RSC Chain é a camada horizontal que monetiza e escala o restante do "
        "portfólio — sem ela, wallet, pagamentos, P2P e escrow seriam produtos isolados.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 07
    story.append(SectionBar("07", "RSC Wallet e produtos para indivíduos"))
    story.append(Spacer(1, 3 * mm))
    story.append(product_card(
        "RSC Wallet",
        "Carteira non-custodial para operar na RSC Chain",
        "Porta de entrada do consumidor no ecossistema. Gerencia ativos, executa transações, "
        "participa de staking e acessa utilidades DeFi em uma única superfície. "
        "Modelo non-custodial: suas chaves, seu controle.",
        [
            "Enviar / receber RSK e ativos compatíveis com status Pending / Confirmed.",
            "Saldo, portfólio e histórico transparente e exportável.",
            "Pagamentos com QR (ideal para comércio e dia a dia).",
            "Staking integrado ao fluxo do produto.",
            "Segurança: frase-semente, PIN, biometria, auto-lock.",
        ],
        styles,
    ))
    story.append(Paragraph("Pagamentos com QR (RSC Payments)", styles["H2"]))
    story.append(Paragraph(
        "Sistema de pagamentos rápido e descentralizado sobre a RSC Chain. Escaneie ou gere um "
        "código QR, confirme e envie — sem intermediários desnecessários e com taxas visíveis "
        "antes de confirmar.",
        styles["Body"],
    ))
    story.extend(bullets([
        "Casos: pagar amigos, comércios, cafés, lojas online.",
        "Transferências P2P em tempo real entre usuários RSC.",
        "Histórico completo e confirmação on-chain.",
    ], styles))
    story.append(Paragraph("Remessas / Transferências", styles["H2"]))
    story.append(Paragraph(
        "Envio de valor global com velocidade e controle. Ideal para envios familiares, freelancers "
        "e pagamentos recorrentes. Custos visíveis antes de confirmar; recebimento instantâneo "
        "entre usuários RSC Wallet.",
        styles["Body"],
    ))
    story.append(Paragraph("Educação / Learn", styles["H2"]))
    story.append(Paragraph(
        "Guias de onboarding: o que é uma wallet, non-custodial vs custodial, proteção da seed phrase, "
        "primeiros passos e FAQ. Reduz a fricção de adoção para usuários novos.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 08
    story.append(SectionBar("08", "Suite empresarial (Business)"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Infraestrutura de pagamentos e finanças para negócios modernos: mais do que uma wallet de consumo.",
        styles["Body"],
    ))
    story.append(product_card(
        "RSC Business Wallet",
        "Carteira empresarial com controle e relatórios",
        "Desenhada para equipes: multi-usuário, papéis, limites, aprovações e reporting.",
        [
            "Papéis: Administrador, Gerente, Operador — permissões granulares.",
            "Limites de pagamento diários/semanais/mensais.",
            "Fluxos de aprovação multi-assinatura operacional para valores sensíveis.",
            "Histórico e relatórios orientados à conciliação.",
        ],
        styles,
    ))
    story.append(Paragraph("RSC Payments (comércio)", styles["H2"]))
    story.extend(bullets([
        "Cobranças com QR e liquidação rápida.",
        "Status de confirmação claros para caixa e back-office.",
        "Integração com e-commerce, apps e TPV / POS.",
    ], styles))
    story.append(Paragraph("API de pagamentos", styles["H2"]))
    story.append(Paragraph(
        "Interfaces para integrar cobranças em aplicações próprias, marketplaces e pontos de venda. "
        "Pensada para developers de produto e partners de integração, com segurança e documentação "
        "alinhadas ao stack do ecossistema.",
        styles["Body"],
    ))
    story.append(Paragraph("Faturamento / Reports", styles["H2"]))
    story.append(Paragraph(
        "Ferramentas de faturamento e relatórios financeiros para operações comerciais sobre "
        "os trilhos RSC — rastreabilidade e exportação para contabilidade.",
        styles["Body"],
    ))
    story.append(Paragraph("Casos de uso comerciais", styles["H2"]))
    story.extend(bullets([
        "Varejo e comércio físico com QR.",
        "Plataformas digitais e e-commerce.",
        "Remessas empresariais e pagamentos a fornecedores.",
        "Marketplaces que precisam de liquidação rápida e auditável.",
    ], styles))
    story.append(PageBreak())

    # 09
    story.append(SectionBar("09", "RSC P2P e RSC Escrow"))
    story.append(Spacer(1, 3 * mm))
    story.append(product_card(
        "RSC P2P",
        "Marketplace peer-to-peer / trilhos institucionais",
        "Infraestrutura de trading peer-to-peer sofisticada para instituições financeiras, "
        "fundos e brokers. Focada em liquidez, clareza de mercado e liquidação segura.",
        [
            "Trading de alto volume com matching avançado.",
            "Infraestrutura de mercado: preços, order book, execução.",
            "Orientação a compliance (KYC/AML) na narrativa institucional.",
            "Casos: OTC institucional, conversão, liquidez entre contrapartes.",
        ],
        styles,
    ))
    story.append(product_card(
        "RSC Escrow",
        "Transações digitais seguras",
        "Trilhos que retêm valor até que todas as partes cumpram condições — construídos "
        "para confiança, automação e operações de alto ticket (incluindo real estate "
        "quando a Reeskova opera fluxos escrow-ready).",
        [
            "Custódia condicional do valor até marcos contratuais.",
            "Redução de risco de contraparte em P2P e deals offline.",
            "Complemento natural da Reeskova e do mercado P2P.",
            "Base para dispute resolution e processos auditáveis.",
        ],
        styles,
    ))
    story.append(Paragraph(
        "Para investidores: P2P + Escrow são motores de volume e confiança. Monetizam infraestrutura "
        "de mercado e reduzem fricção em operações que hoje dependem de intermediários caros ou lentos.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 10
    story.append(SectionBar("10", "RSC Corporate"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Soluções e serviços enterprise", styles["Tagline"]))
    story.append(Paragraph(
        "A RSC Corporate oferece serviços e soluções blockchain empresariais para grandes "
        "instituições que precisam de controle, privacidade e acompanhamento de ponta a ponta.",
        styles["Body"],
    ))
    story.append(Paragraph("Linhas de serviço", styles["H2"]))
    corp = [
        ["Linha", "Entregáveis"],
        ["Consultoria blockchain", "Estratégia, roadmap, avaliação de segurança, guia de implementação"],
        ["Infraestrutura dedicada", "Redes privadas, configuração sob medida, managed services 24/7"],
        ["Integrações privadas", "ERP/CRM, sync em tempo real, apps e smart contracts sob medida"],
        ["Suporte enterprise", "Suporte 24/7, account manager, SLA prioritário, capacitação"],
    ]
    story.append(info_table(corp, styles, [50 * mm, 120 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "Este braço transforma a tecnologia do grupo em receita B2B recorrente (serviços "
        "gerenciados, projetos de integração e redes privadas), complementando a adoção "
        "consumer de wallet/mining.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 11
    story.append(SectionBar("11", "REESK (RSK) — Token nativo"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "REESK (ticker RSK) é o token nativo da RSC Chain. Seu papel é alinhar incentivos entre "
        "usuários, validadores/participantes da rede, builders e instituições.",
        styles["Body"],
    ))
    story.append(Paragraph("Utilidade", styles["H2"]))
    story.extend(bullets([
        "Fees de rede — pagamento de comissões no ecossistema.",
        "Staking — bloqueio de tokens para apoiar a rede e obter recompensas (APY comunicado até ~5% ao ano conforme regras de produto; lock mínimo ilustrativo 30 dias / unstake 7 dias).",
        "Governança / participação — voz na evolução do ecossistema onde aplicável.",
        "Acesso a utilidades — mining rewards, eventos e serviços do stack.",
    ], styles))
    story.append(Paragraph("Venda / liquidez (wRSK)", styles["H2"]))
    story.append(Paragraph(
        "Existe uma narrativa e produto de venda pública de wRSK na BSC (compra com USDT via "
        "MetaMask), com esquema de vesting comunicado (ex.: 25% imediato e 75% ao longo "
        "de 6 meses). O wRSK atua como representação/ponte de liquidez para o ecossistema REESK. "
        "Os termos exatos de smart contracts, supply e vesting devem ser verificados na "
        "documentação on-chain e legal vigente no momento de qualquer investimento.",
        styles["Body"],
    ))
    story.append(Paragraph(
        "Aviso: este documento é informativo e não constitui oferta de valores mobiliários, "
        "conselho de investimento nem solicitação. Toda participação em tokens implica risco "
        "de perda de capital.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # 12
    story.append(SectionBar("12", "Mining, staking e recompensas"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Participação na rede", styles["H2"]))
    story.append(Paragraph(
        "Além do staking no produto, a RSC Group opera uma camada de participação e recompensas "
        "que inclui mineração mobile (app oficial na Google Play: RSC Mining), dashboard web, "
        "pools, earnings, indicações e eventos temporários (ex.: campanhas Snow Mining / Christmas).",
        styles["Body"],
    ))
    story.extend(bullets([
        "Sessões de mining (ex.: janelas de 24h) com métricas de earnings.",
        "Programa de indicações (ordem de grandeza comunicada ~10% conforme implementação).",
        "Eventos com mecânicas de raridade / engajamento para crescimento da comunidade.",
        "Integração com wallet e utilidades do ecossistema.",
    ], styles))
    story.append(Paragraph("Por que importa para o negócio", styles["H2"]))
    story.append(Paragraph(
        "Mining e rewards são motores de aquisição e retenção de usuários. Alimentam a base "
        "consumer que depois usa wallet, pagamentos e — em escala — demanda liquidez e serviços "
        "P2P/escrow. Para investidores, é o funil de adoção retail do ecossistema.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 13
    story.append(SectionBar("13", "Plataforma para desenvolvedores"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "A RSC Group abre a infraestrutura para builders: documentação, APIs/SDKs, testnet/faucet "
        "e roadmap técnico público.",
        styles["Body"],
    ))
    story.extend(bullets([
        "Developer Docs — guias, RPC, nós, padrões REST/WebSocket.",
        "APIs & SDKs — wallet, pagamentos, smart contracts / integração de apps.",
        "Testnet / Faucet — ambiente de teste sem risco de mainnet.",
        "Roadmap técnico — transparência da evolução da rede e do produto.",
        "GitHub (rscchain) — superfície open / colaboração.",
    ], styles))
    story.append(Paragraph(
        "Uma plataforma aberta multiplica o valor da chain: terceiros constroem dApps, "
        "integrações comerciais e ferramentas verticais sobre os mesmos trilhos.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 14
    story.append(SectionBar("14", "Segurança e conformidade"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "A segurança faz parte do produto, não é um banner. O modelo non-custodial coloca o "
        "controle das chaves no usuário; a plataforma aporta camadas de proteção e boas práticas.",
        styles["Body"],
    ))
    story.append(Paragraph("Camadas de segurança (produtos consumer)", styles["H2"]))
    story.extend(bullets([
        "Non-custodial — a RSC não custodia fundos do usuário.",
        "Backup com frase-semente (seed) — recuperação responsável offline.",
        "PIN / biometria / auto-lock — proteção do dispositivo.",
        "Lembretes anti-phishing e verificação de endereços.",
        "Transações com custos visíveis e status claros.",
    ], styles))
    story.append(Paragraph("Orientação institucional", styles["H2"]))
    story.extend(bullets([
        "Arquitetura de segurança multicamada na RSC Chain.",
        "Narrativa de compliance KYC/AML em mercados institucionais.",
        "Redes privadas e managed infrastructure via RSC Corporate.",
        "Documentação técnica adicional: pós-quântica, ZKP, firewall L7, behavioral analysis (GitBook).",
    ], styles))
    story.append(Paragraph(
        "A segurança final também depende do cuidado do usuário com a frase-semente e o "
        "dispositivo. Em contextos enterprise, definem-se responsabilidades compartilhadas "
        "(cliente ↔ RSC) conforme o contrato de serviço.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # 15
    story.append(SectionBar("15", "Arquitetura tecnológica"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Visão simplificada do stack para due diligence técnica e de produto:",
        styles["Body"],
    ))
    arch = [
        ["Camada", "Componentes", "Notas"],
        ["Marca / Web corporativa", "Site RSC Group (React/Vite), i18n EN/ES", "Narrativa investidores e clientes"],
        ["Consumer web", "rsc-web: wallet, mining, staking, P2P, explorer", "Experiência do usuário + campanhas"],
        ["Mobile", "App RSC Mining (Android / Play Store)", "Aquisição e engajamento"],
        ["Backend plataforma", "APIs, Supabase/Postgres, sessões mining, indicações", "Persistência e ops"],
        ["Chain API", "API da RSC Chain (infra cloud)", "Liquidação e operações de rede"],
        ["Token sale", "Frontend wRSK + contratos BSC / MetaMask", "Liquidez e distribuição"],
        ["Admin / Mission Control", "Painéis ops, GraphQL, RBAC, treasury/campaigns", "Operação interna"],
        ["Suporte", "Chatbot IA + escalonamento humano", "Atendimento ao usuário"],
    ]
    story.append(info_table(arch, styles, [42 * mm, 70 * mm, 58 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Capacidades transversais do grupo", styles["H2"]))
    story.extend(bullets([
        "Blockchain — liquidação segura e verificável.",
        "IA — matching (Reeskova), automação, suporte e detecção de anomalias (cadeia).",
        "Cloud — disponibilidade e escala global.",
        "Security — defesa em profundidade em identidade e transações.",
        "Data Analytics — insight de mercados, ativos e operações.",
        "APIs — composição para partners e instituições.",
    ], styles))
    story.append(PageBreak())

    # 16
    story.append(SectionBar("16", "Públicos e casos de uso"))
    story.append(Spacer(1, 3 * mm))
    aud = [
        ["Público", "O que obtém", "Produtos-chave"],
        ["Indivíduos", "Dinheiro digital cotidiano com controle de chaves", "Wallet, QR, remessas, staking, mining, Learn"],
        ["Empresas / comércios", "Cobranças, conciliação, APIs, papéis", "Business Wallet, Payments, API, Billing"],
        ["Instituições", "Trilhos de alto volume e compliance", "Chain, P2P, Escrow, Corporate, RSK"],
        ["Real estate", "Marketplace + settlement confiável", "Reeskova (+ Escrow / Chain)"],
        ["Developers", "Construir sobre a rede", "Docs, APIs, testnet, GitHub"],
        ["Investidores / token", "Exposição ao ecossistema e utilidade RSK", "REESK / wRSK, narrativa equity do grupo"],
    ]
    story.append(info_table(aud, styles, [35 * mm, 70 * mm, 65 * mm]))
    story.append(Spacer(1, 5 * mm))
    story.append(Paragraph(
        "Uma cadeia, quatro entradas claras: Pessoas · Empresas · Instituições · Developers. "
        "Cada rota liga a capacidades concretas sem diluir a marca corporativa.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 17
    story.append(SectionBar("17", "Proposta de valor para investidores"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Por que a RSC Group é uma tese multiproduto", styles["H2"]))
    story.extend(bullets([
        "Diversificação interna — real estate + fintech + infra + markets, não um único KPI de wallet.",
        "Shared infrastructure — menor custo marginal ao lançar o próximo produto sobre Chain/APIs.",
        "Funil consumer → enterprise — mining/wallet alimentam adoção; Corporate/P2P monetizam B2B.",
        "Token utility alinhada — RSK conecta fees, staking e participação com uso real de plataforma.",
        "Marca institucional — navy, narrativa de compliance, vertical Reeskova premium (não puro hype).",
        "Plataforma aberta — developers e partners ampliam o ecossistema sem que tudo seja construído pelo core team.",
    ], styles))
    story.append(Paragraph("Ângulos de diligência recomendados", styles["H2"]))
    dd = [
        ["Área", "Perguntas-chave"],
        ["Produto", "Quais módulos estão em produção vs. roadmap? Métricas de usuários ativos / TVL / volume P2P."],
        ["Tecnologia", "Auditorias de contratos, estado real de consenso/TPS, dependência BSC vs. chain nativa."],
        ["Tokenomics", "Supply, vesting, utilidade real de fees, inflação de rewards/mining."],
        ["Legal / compliance", "Jurisdição, KYC/AML em P2P, natureza legal de wRSK/sale."],
        ["Go-to-market", "Canais (Play Store, social @Reeskcap), partnerships Reeskova, pipeline Corporate."],
        ["Equipe & ops", "Mission Control, treasury, suporte, capacidade de entrega do roadmap 2026+."],
    ]
    story.append(info_table(dd, styles, [35 * mm, 135 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "Este briefing facilita a conversa inicial. Um data room completo (métricas, "
        "contratos, auditorias, cap table) deve ser solicitado à equipe da RSC Group no "
        "processo formal de investimento ou partnership.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # 18
    story.append(SectionBar("18", "Proposta de valor para empresas"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "As empresas podem entrar no ecossistema pelo caminho que melhor se encaixa na operação:",
        styles["Body"],
    ))
    paths = [
        ["Caminho", "Ideal para", "Como começar"],
        ["Cobranças digitais", "Varejo, food, e-commerce", "Business Wallet + QR Payments"],
        ["Integração API", "Plataformas e fintechs", "API de pagamentos / SDKs"],
        ["Liquidação / P2P", "Brokers, fundos, desks", "Mercado P2P + Escrow"],
        ["Real estate tech", "Agências, incorporadoras, proptech", "Reeskova (+ escrow-ready)"],
        ["Infra privada", "Bancos, corporates regulados", "RSC Corporate / redes dedicadas"],
        ["Build on chain", "Equipes de produto / Web3", "Docs, testnet, APIs"],
    ]
    story.append(info_table(paths, styles, [38 * mm, 55 * mm, 77 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Benefícios operacionais", styles["H2"]))
    story.extend(bullets([
        "Mesma infraestrutura para clientes finais e back-office.",
        "Status de pagamento claros (pending/confirmed) para conciliação.",
        "Papéis e limites para controle interno.",
        "Opção de passar de piloto QR para integração API e, se aplicável, para rede privada.",
        "Suporte enterprise e account management no tramo Corporate.",
    ], styles))
    story.append(PageBreak())

    # 19
    story.append(SectionBar("19", "Roadmap e trajetória"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Timeline comunicada na narrativa de produto (sequência ilustrativa 2026+):",
        styles["Body"],
    ))
    road = [
        ["Fase", "Foco"],
        ["Reeskova", "Produto estrela real estate — marketplace e marca premium"],
        ["Wallet", "Porta consumer non-custodial madura"],
        ["Escrow", "Trilhos de confiança para deals de alto valor"],
        ["P2P", "Mercado e liquidez entre contrapartes"],
        ["Chain", "Consolidação de infraestrutura e métricas de rede"],
        ["IA", "Matching, automação e segurança inteligente cross-product"],
        ["Expansão global", "Cidades, idiomas, partnerships institucionais"],
    ]
    story.append(info_table(road, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Visão de plataforma (além da wallet)", styles["H2"]))
    story.extend(bullets([
        "Wallet ↔ Rewards / Mining / Events — engajamento contínuo.",
        "Wallet ↔ Bridge (roadmap) — interoperabilidade com outras redes.",
        "Wallet ↔ RSC Bank / Payments (visão) — experiência bancária cripto-first.",
    ], styles))
    story.append(PageBreak())

    # 20
    story.append(SectionBar("20", "Contato e próximos passos"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Se você representa um fundo, family office, empresa ou instituição interessada no "
        "ecossistema RSC Group, os próximos passos recomendados são:",
        styles["Body"],
    ))
    story.extend(bullets([
        "Revisar este overview com sua equipe técnica e de investimento.",
        "Solicitar demo de produto (Wallet / Reeskova / Business / P2P conforme interesse).",
        "Pedir data room: métricas, tokenomics detalhado, contratos, legal.",
        "Agendar reunião com a equipe Corporate / Partnerships.",
        "Para builders: abrir documentação e testnet.",
    ], styles))
    story.append(Paragraph("Canais", styles["H2"]))
    contact = [
        ["Canal", "Referência"],
        ["Web corporativa", "rscgroup.com"],
        ["RSC Chain", "rscchain.com"],
        ["X / Twitter", "@Reeskcap"],
        ["Telegram", "t.me/RSCchain"],
        ["GitHub", "github.com/rscchain"],
        ["Contato / alianças", "Formulário e seção Contact no site corporativo"],
        ["Imprensa", "Media kit e comunicados na seção Press"],
    ]
    story.append(info_table(contact, styles, [45 * mm, 125 * mm]))
    story.append(Spacer(1, 8 * mm))
    story.append(ColoredBox(
        "Pronto para construir o futuro?",
        "Explore as plataformas que a RSC Group constrói para real estate, finanças e infraestrutura digital.",
        height=24 * mm,
        title_size=14,
        sub_size=9,
    ))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(
        f"© {year} RSC Group. Todos os direitos reservados. Documento informativo. "
        "Non-custodial: a RSC não custodia fundos de usuários finais. Proteja sua frase de recuperação. "
        "As informações de produto e métricas podem evoluir; valide sempre contra fontes oficiais "
        "e documentação vigente antes de tomar decisões de investimento ou integração.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # ANEXO
    story.append(SectionBar("A", "Anexo — Glossário rápido"))
    story.append(Spacer(1, 3 * mm))
    gloss = [
        ["Termo", "Definição breve"],
        ["RSC Group", "Empresa de tecnologia matriz do ecossistema"],
        ["Reeskova", "Marketplace imobiliário digital do grupo"],
        ["RSC Chain", "Blockchain / infraestrutura de liquidação"],
        ["REESK / RSK", "Token nativo de utilidade no ecossistema"],
        ["wRSK", "Representação / venda na BSC vinculada ao REESK"],
        ["Non-custodial", "O usuário controla as chaves privadas"],
        ["Escrow", "Custódia condicional até cumprimento de condições"],
        ["P2P", "Troca peer-to-peer entre contrapartes"],
        ["Staking", "Bloqueio de tokens para segurança da rede e rewards"],
        ["Mining (plataforma)", "Participação/recompensas via app/web do ecossistema"],
        ["QR Payments", "Pagamentos por código QR sobre a RSC Chain"],
        ["Business Wallet", "Wallet multi-usuário com papéis para empresas"],
        ["RSC Corporate", "Serviços enterprise, redes privadas, suporte"],
        ["Finality", "Momento em que uma tx é considerada irreversível"],
        ["TPS", "Transações por segundo (capacidade da rede)"],
        ["KYC / AML", "Conheça seu cliente / combate à lavagem de dinheiro"],
        ["Seed phrase", "Frase de recuperação da wallet"],
    ]
    story.append(info_table(gloss, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(
        "Fim do documento — RSC Group Overview para Investidores e Empresas (PT-BR)",
        styles["BodyCenter"],
    ))
    story.append(Paragraph(
        "«Uma empresa. Múltiplas plataformas. Uma infraestrutura compartilhada.»",
        styles["Callout"],
    ))

    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    print(f"PDF gerado: {OUTPUT}")
    return OUTPUT


if __name__ == "__main__":
    build()
