#!/usr/bin/env python3
"""Generate RSC Group investor & company overview PDF."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, ListFlowable, ListItem, HRFlowable,
    Flowable,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from datetime import datetime
import os

# Fonts
FONT_DIR = "/usr/share/fonts/truetype/dejavu"
pdfmetrics.registerFont(TTFont("DejaVu", os.path.join(FONT_DIR, "DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("DejaVuBold", os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf")))
pdfmetrics.registerFont(TTFont("DejaVuOblique", os.path.join(FONT_DIR, "DejaVuSans-Oblique.ttf")))

# Brand colors
NAVY = HexColor("#081A33")
NAVY_MID = HexColor("#0F2A4A")
NAVY_LIGHT = HexColor("#1A3A5C")
ACCENT = HexColor("#2B6CB0")
ACCENT_SOFT = HexColor("#E8F0F8")
GOLD = HexColor("#C9A227")
SLATE = HexColor("#334155")
MUTED = HexColor("#64748B")
LIGHT_BG = HexColor("#F5F7FA")
BORDER = HexColor("#E2E8F0")
GREEN = HexColor("#0D9488")

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm

OUTPUT = os.path.join(os.path.dirname(__file__), "RSC_Group_Overview_Investors_Companies.pdf")


class ColoredBox(Flowable):
    """Full-width colored banner with title/subtitle."""

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
        name="CoverTitle", fontName="DejaVuBold", fontSize=28, leading=34,
        textColor=white, alignment=TA_LEFT, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="CoverSub", fontName="DejaVu", fontSize=12, leading=18,
        textColor=HexColor("#B8C9DC"), alignment=TA_LEFT, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="CoverMeta", fontName="DejaVu", fontSize=9, leading=13,
        textColor=HexColor("#8FA3B8"), alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="H1", fontName="DejaVuBold", fontSize=16, leading=20,
        textColor=NAVY, spaceBefore=10, spaceAfter=8,
    ))
    styles.add(ParagraphStyle(
        name="H2", fontName="DejaVuBold", fontSize=12, leading=16,
        textColor=NAVY_MID, spaceBefore=10, spaceAfter=5,
    ))
    styles.add(ParagraphStyle(
        name="H3", fontName="DejaVuBold", fontSize=10.5, leading=14,
        textColor=ACCENT, spaceBefore=7, spaceAfter=3,
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
        name="Caption", fontName="DejaVu", fontSize=8, leading=11,
        textColor=MUTED, alignment=TA_CENTER, spaceBefore=2, spaceAfter=8,
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
        name="Footer", fontName="DejaVu", fontSize=7.5, leading=10,
        textColor=MUTED,
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
    canv.drawString(MARGIN, PAGE_H - 5.2 * mm, "RSC GROUP  ·  Documento corporativo para inversores y empresas")
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
        title="RSC Group — Overview para Inversores y Empresas",
        author="RSC Group",
        subject="Documento corporativo del ecosistema RSC Group",
    )

    story = []
    year = datetime.now().year

    # ========== COVER ==========
    story.append(Spacer(1, 25 * mm))
    cover_box = ColoredBox(
        "RSC GROUP",
        "Building the Next Generation of Digital Platforms",
        height=42 * mm,
        title_size=26,
        sub_size=11,
    )
    story.append(cover_box)
    story.append(Spacer(1, 12 * mm))
    story.append(Paragraph(
        "Documento corporativo de presentación",
        styles["H1"],
    ))
    story.append(Paragraph(
        "Qué es RSC Group, cómo funciona su ecosistema y qué hace cada uno de sus componentes — "
        "pensado para inversores, socios estratégicos, empresas e instituciones.",
        styles["Body"],
    ))
    story.append(Spacer(1, 8 * mm))

    meta_rows = [
        ["Tipo de documento", "Overview corporativo / Investment briefing"],
        ["Audiencia", "Inversores · Empresas · Instituciones · Partners"],
        ["Idioma", "Español"],
        ["Versión", f"{year}.1"],
        ["Sitios web", "rscgroup.com  ·  rscchain.com"],
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
        "«No construimos apps. Construimos ecosistemas digitales.»",
        styles["Callout"],
    ))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(
        "Este documento describe la arquitectura de negocio y de producto de RSC Group: "
        "Reeskova (real estate), RSC Chain (infraestructura blockchain), RSC Wallet, "
        "pagos, P2P, Escrow, Corporate, Mining, el token REESK (RSK) y las suites para "
        "empresas, instituciones y desarrolladores.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # ========== TOC ==========
    story.append(SectionBar("00", "Índice"))
    story.append(Spacer(1, 4 * mm))
    toc = [
        ("01", "Resumen ejecutivo"),
        ("02", "Qué es RSC Group"),
        ("03", "Visión, misión y filosofía"),
        ("04", "Mapa del ecosistema"),
        ("05", "Reeskova — Real Estate"),
        ("06", "RSC Chain — Infraestructura blockchain"),
        ("07", "RSC Wallet y productos para individuos"),
        ("08", "Suite empresarial (Business)"),
        ("09", "RSC P2P y RSC Escrow"),
        ("10", "RSC Corporate"),
        ("11", "REESK (RSK) — Token nativo"),
        ("12", "Mining, staking y recompensas"),
        ("13", "Plataforma para desarrolladores"),
        ("14", "Seguridad y cumplimiento"),
        ("15", "Arquitectura tecnológica"),
        ("16", "Audiencias y casos de uso"),
        ("17", "Propuesta de valor para inversores"),
        ("18", "Propuesta de valor para empresas"),
        ("19", "Roadmap y trayectoria"),
        ("20", "Contacto y próximos pasos"),
        ("A", "Anexo — Glosario rápido"),
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

    # ========== 01 EXEC SUMMARY ==========
    story.append(SectionBar("01", "Resumen ejecutivo"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "RSC Group es una empresa tecnológica multiproducto que construye plataformas digitales "
        "para inmobiliario, finanzas digitales, transacciones seguras e infraestructura "
        "descentralizada. No es un único producto: es un stack integrado bajo una misma "
        "marca corporativa y una infraestructura compartida (RSC Chain).",
        styles["Body"],
    ))
    story.append(Paragraph(
        "La tesis central es simple: <b>una empresa, múltiples plataformas</b>. Cada producto "
        "funciona de forma independiente y gana fuerza cuando se conecta al resto del ecosistema — "
        "wallet, pagos, escrow, P2P, real estate y servicios corporativos comparten rieles, "
        "identidad y liquidación.",
        styles["Body"],
    ))

    story.append(Paragraph("Pilares del negocio", styles["H2"]))
    pillars = [
        ["Pilar", "Descripción", "Beneficio clave"],
        ["Reeskova", "Marketplace inmobiliario digital con IA, listings verificados y flujos listos para escrow", "Entrada a real estate y capital"],
        ["RSC Chain", "Infraestructura blockchain enterprise (alto TPS, finality rápida, compliance)", "Rieles de liquidación compartidos"],
        ["Finanzas digitales", "Wallet, QR payments, remesas, staking, mining", "Adopción retail y engagement"],
        ["Mercados & confianza", "P2P institucional + Escrow digital", "Liquidación segura B2B/B2C"],
        ["Enterprise", "RSC Corporate: consultoría, redes privadas, integraciones ERP/CRM", "Ingresos B2B / institucional"],
        ["Token REESK (RSK)", "Utilidad nativa: fees, staking, gobernanza, participación", "Alineación económica del ecosistema"],
    ]
    story.append(info_table(pillars, styles, [32 * mm, 95 * mm, 43 * mm]))
    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph("Señales de plataforma (objetivos de diseño)", styles["H2"]))
    metrics = [
        ["Métrica", "Objetivo", "Significado"],
        ["Throughput", "10,000+ TPS (objetivo)", "Capacidad para carga institucional"],
        ["Confirmación", "< 2 segundos (objetivo)", "UX de pagos y liquidación"],
        ["Disponibilidad", "99.9% – 99.99%", "Operación continua"],
        ["Modelo de custodia", "Non-custodial", "El usuario controla sus claves"],
        ["Cobertura de producto", "10+ productos / módulos", "Portfolio multiproducto"],
    ]
    story.append(info_table(metrics, styles, [40 * mm, 50 * mm, 80 * mm]))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Nota: las cifras de rendimiento representan objetivos de diseño y capacidad de plataforma "
        "comunicados en la documentación de producto; deben validarse en el contexto de cada "
        "despliegue y due diligence técnica.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # ========== 02 WHAT IS ==========
    story.append(SectionBar("02", "Qué es RSC Group"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "RSC Group es la marca matriz (holding tecnológico) detrás de un portfolio de plataformas "
        "digitales. Su propuesta no se limita a “otra wallet” o “otra chain”: organiza productos "
        "verticales (inmobiliario, pagos, trading P2P, escrow) sobre una capa horizontal de "
        "infraestructura, seguridad, APIs y datos.",
        styles["Body"],
    ))
    story.append(Paragraph("Posicionamiento", styles["H2"]))
    story.append(Paragraph(
        "<b>Tagline:</b> Building the Next Generation of Digital Platforms.<br/>"
        "<b>Manifiesto:</b> No construimos apps. Construimos ecosistemas digitales.<br/>"
        "<b>Color de marca:</b> Navy #081A33 — sobriedad institucional, no estética de hype crypto.",
        styles["Body"],
    ))
    story.append(Paragraph("Qué problema resuelve", styles["H2"]))
    story.extend(bullets([
        "Fragmentación de finanzas digitales: wallet, pagos, remesas y staking viven en silos.",
        "Fricción cross-border y remesas: intermediarios, costos opacos y demoras.",
        "Necesidad institucional de rieles: P2P, escrow, compliance y redes privadas.",
        "Real estate digital: descubrimiento, confianza, listings verificados y settlement seguro.",
        "Participación en red: mining, referrals, staking y utilidad del token nativo.",
    ], styles))
    story.append(Paragraph("Marcas del grupo", styles["H2"]))
    brands = [
        ["Marca", "Rol"],
        ["RSC Group", "Empresa matriz / marca corporativa (rscgroup.com)"],
        ["Reeskova", "Producto estrella de real estate digital"],
        ["RSC Chain", "Infraestructura blockchain y marca crypto (rscchain.com)"],
        ["REESK / RSK / wRSK", "Token nativo (y representación en venta BSC cuando aplique)"],
        ["RSC Wallet / RSC Mining", "Productos consumer de activos y participación en red"],
    ]
    story.append(info_table(brands, styles, [45 * mm, 125 * mm]))
    story.append(PageBreak())

    # ========== 03 VISION ==========
    story.append(SectionBar("03", "Visión, misión y filosofía"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Visión", styles["H2"]))
    story.append(Paragraph(
        "Crear un ecosistema financiero descentralizado que empodere a individuos e instituciones "
        "en todo el mundo, haciendo los servicios financieros accesibles, transparentes y seguros "
        "para todos.",
        styles["Body"],
    ))
    story.append(Paragraph("Misión", styles["H2"]))
    story.append(Paragraph(
        "Construir y mantener la infraestructura de RSC Chain, proporcionando soluciones blockchain "
        "innovadoras que permitan transacciones financieras seguras, rápidas y rentables, mientras "
        "se fomenta la inclusión financiera y se habilitan plataformas digitales de nueva generación "
        "(incluido el real estate con Reeskova).",
        styles["Body"],
    ))
    story.append(Paragraph("Filosofía", styles["H2"]))
    phil = [
        ["Principio", "Qué significa en la práctica"],
        ["Descentralización", "Sistemas más transparentes, justos y resilientes; menos puntos únicos de fallo."],
        ["Seguridad primero", "Protección de fondos y datos por encima de velocidad de feature."],
        ["Innovación abierta", "Developers, empresas e instituciones pueden construir e integrar juntos."],
    ]
    story.append(info_table(phil, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Valores de liderazgo", styles["H2"]))
    story.extend(bullets([
        "Innovación — productos con ambición tecnológica real.",
        "Integridad — comunicación clara hacia usuarios, partners e inversores.",
        "Tecnología — blockchain es una capa; el stack incluye IA, cloud, analytics y APIs.",
        "Confianza — escrow, verificación y non-custodial como diseño, no marketing.",
        "Ejecución — roadmap secuenciado: productos estrella → expansión global.",
    ], styles))
    story.append(PageBreak())

    # ========== 04 ECOSYSTEM MAP ==========
    story.append(SectionBar("04", "Mapa del ecosistema"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "RSC Group está en el centro. Los productos se expanden como órbita y se reconectan "
        "a través de infraestructura compartida (cadena, APIs, seguridad, identidad).",
        styles["Body"],
    ))
    eco = [
        ["Componente", "Categoría", "Función principal"],
        ["Reeskova", "Real Estate", "Marketplace: comprar, vender, alquilar, invertir"],
        ["RSC Chain", "Infraestructura", "Blockchain enterprise, liquidación, consenso"],
        ["RSC Wallet", "Consumer Finance", "Activos non-custodial, enviar/recibir, QR, staking"],
        ["Pagos & QR", "Payments", "Cobros y pagos cotidianos con estados claros"],
        ["Remesas", "Payments", "Transferencias cross-border P2P"],
        ["Business Wallet / API", "B2B", "Cobros, roles, reporting, integración POS/e-commerce"],
        ["RSC P2P", "Markets", "Trading peer-to-peer institucional / marketplace"],
        ["RSC Escrow", "Trust", "Custodia condicional hasta cumplir condiciones"],
        ["RSC Corporate", "Enterprise", "Consultoría, redes privadas, soporte 24/7"],
        ["REESK (RSK)", "Tokenomics", "Fees, staking, gobernanza, utilidad de red"],
        ["Mining & Rewards", "Participation", "Participación móvil, referidos, eventos"],
        ["Developer Platform", "Builders", "Docs, APIs/SDKs, testnet, faucet, roadmap"],
    ]
    story.append(info_table(eco, styles, [40 * mm, 35 * mm, 95 * mm]))
    story.append(Spacer(1, 5 * mm))
    story.append(Paragraph("Cómo se conecta todo", styles["H2"]))
    story.append(Paragraph(
        "La wallet es la puerta de acceso del consumidor. RSC Chain coordina identidad, pagos, "
        "utilidades y el roadmap hacia bridge y experiencias de pago de grado bancario. "
        "Reeskova aporta la vertical inmobiliaria y se apoya en capacidades del grupo "
        "(IA, analytics, escrow-ready, blockchain-ready). P2P y Escrow aportan rieles de "
        "confianza para instituciones y operaciones de alto valor. Corporate cierra el ciclo "
        "enterprise con redes privadas e integraciones.",
        styles["Body"],
    ))
    story.append(Paragraph(
        "Capas tecnológicas transversales: Blockchain · Inteligencia Artificial · Cloud · "
        "Seguridad · Data Analytics · APIs · Plataforma abierta.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # ========== 05 REESKOVA ==========
    story.append(SectionBar("05", "Reeskova — Real Estate"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("El futuro del real estate", styles["Tagline"]))
    story.append(Paragraph(
        "Reeskova es el marketplace inmobiliario insignia de RSC Group. Permite comprar, vender, "
        "alquilar e invertir a través de una plataforma digital premium diseñada para la próxima "
        "generación de propiedades y capital. No es un clasificado estático: corre sobre "
        "tecnología del grupo (IA, big data, cloud, analytics, escrow-ready y blockchain-ready).",
        styles["Body"],
    ))
    story.append(Paragraph("Propuesta de valor", styles["H2"]))
    story.extend(bullets([
        "AI Search — encuentra propiedades según estilo de vida e intención de inversión.",
        "Verified Listings — destacados revisados para avanzar con confianza.",
        "Secure Transactions — negociaciones más seguras y flujos listos para escrow.",
        "Smart Investment — señales y analytics sin ruido para evaluar oportunidad.",
        "Mapa interactivo — descubrimiento geográfico premium con filtros (comprar / alquilar / invertir).",
    ], styles))
    story.append(Paragraph("Journey del usuario", styles["H2"]))
    journey = [
        ["Paso", "Acción", "Resultado"],
        ["1. Search", "Filtros asistidos por IA + mapa en vivo", "Shortlist relevante"],
        ["2. Visit", "Agenda visitas con profesionales de confianza", "Validación física"],
        ["3. Negotiate", "Conversaciones y propuestas en flujo premium", "Oferta estructurada"],
        ["4. Secure Deal", "Infraestructura transaccional más segura", "Cierre con confianza"],
        ["5. Move In", "Cierre con claridad", "Nuevo capítulo / activo"],
    ]
    story.append(info_table(journey, styles, [30 * mm, 75 * mm, 65 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Audiencias", styles["H2"]))
    story.extend(bullets([
        "Buyers — exploración, comparación y contacto con experiencia de producto moderna.",
        "Agents — leads cualificados, storytelling premium de listings, alineación CRM.",
        "Developers — spotlight de lanzamientos, media rica y pipeline comercial.",
        "Investors — framing de ROI, rentabilidad y crecimiento con sobriedad institucional.",
    ], styles))
    story.append(Paragraph(
        "Reeskova fortalece la marca matriz RSC Group sin distraer a quien busca vivienda, "
        "y deja espacio para el siguiente producto del ecosistema (P2P, Escrow, soluciones "
        "financieras futuras).",
        styles["Body"],
    ))
    story.append(PageBreak())

    # ========== 06 CHAIN ==========
    story.append(SectionBar("06", "RSC Chain — Infraestructura blockchain"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Infraestructura blockchain empresarial", styles["Tagline"]))
    story.append(Paragraph(
        "RSC Chain es la infraestructura blockchain de alto rendimiento diseñada para uso "
        "institucional. Combina seguridad de nivel empresarial, escalabilidad y características "
        "de cumplimiento para habilitar aplicaciones financieras y de liquidación a escala.",
        styles["Body"],
    ))
    story.append(Paragraph("Características principales", styles["H2"]))
    story.extend(bullets([
        "Alto rendimiento — optimizado para alto throughput y baja latencia.",
        "Seguridad empresarial — arquitectura multicapa y gestión de claves institucional.",
        "Cumplimiento regulatorio — orientación KYC/AML y capacidades de reporting.",
        "Finalidad rápida — confirmación con finalidad determinística para liquidación.",
        "Tolerancia a fallos bizantinos — resiliencia ante fallos y actores maliciosos.",
    ], styles))
    story.append(Paragraph("Arquitectura en capas", styles["H2"]))
    layers = [
        ["Capa", "Responsabilidad"],
        ["Consenso", "Seguridad de red y finalidad de transacciones"],
        ["Ejecución", "Entorno de alto rendimiento para contratos y transacciones complejas"],
        ["Aplicación", "APIs y herramientas para builders e instituciones"],
    ]
    story.append(info_table(layers, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Casos de uso institucionales", styles["H2"]))
    story.extend(bullets([
        "CBDC / monedas digitales de banco central — compliance, throughput, auditabilidad.",
        "Pagos transfronterizos — liquidación rápida, costos reducidos, disponibilidad 24/7.",
        "Infraestructura de activos digitales — tokenización, DeFi institucional, smart contracts.",
    ], styles))
    story.append(Paragraph("Documentación técnica (GitBook)", styles["H2"]))
    story.append(Paragraph(
        "La documentación de RSC Chain describe, entre otros módulos: arquitectura, IA integrada, "
        "seguridad (incluyendo criptografía post-cuántica y ZKP en la narrativa técnica), "
        "consenso híbrido (PoW/PoS/VRF), red P2P (Kademlia, Gossip, QUIC/Noise), almacenamiento, "
        "APIs REST/WebSocket, monitoreo y casos de uso sectoriales (DeFi, gaming, healthcare, "
        "supply chain, government).",
        styles["Body"],
    ))
    story.append(Paragraph(
        "Para inversores: RSC Chain es la capa horizontal que monetiza y escala el resto del "
        "portfolio — sin ella, wallet, pagos, P2P y escrow serían productos aislados.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # ========== 07 WALLET ==========
    story.append(SectionBar("07", "RSC Wallet y productos para individuos"))
    story.append(Spacer(1, 3 * mm))
    story.append(product_card(
        "RSC Wallet",
        "Billetera non-custodial para operar en RSC Chain",
        "Puerta de entrada del consumidor al ecosistema. Gestiona activos, ejecuta transacciones, "
        "participa en staking y accede a utilidades DeFi desde una sola superficie. "
        "Modelo non-custodial: tus llaves, tu control.",
        [
            "Enviar / recibir RSK y activos compatibles con estados Pending / Confirmed.",
            "Balance, portfolio e historial transparente y exportable.",
            "Pagos con QR (ideal para comercio y vida diaria).",
            "Staking integrado al flujo de producto.",
            "Seguridad: frase semilla, PIN, biometría, auto-lock.",
        ],
        styles,
    ))
    story.append(Paragraph("Pagos con QR (RSC Payments)", styles["H2"]))
    story.append(Paragraph(
        "Sistema de pagos rápido y descentralizado sobre RSC Chain. Escanea o genera un código QR, "
        "confirma y envía — sin intermediarios innecesarios y con comisiones visibles antes de confirmar.",
        styles["Body"],
    ))
    story.extend(bullets([
        "Casos: pagar a amigos, comercios, cafeterías, tiendas online.",
        "Transferencias P2P en tiempo real entre usuarios RSC.",
        "Historial completo y confirmación on-chain.",
    ], styles))
    story.append(Paragraph("Remesas / Transferencias", styles["H2"]))
    story.append(Paragraph(
        "Envío de valor global con velocidad y control. Ideal para envíos familiares, freelancers "
        "y pagos recurrentes. Costos visibles antes de confirmar; recepción instantánea entre "
        "usuarios RSC Wallet.",
        styles["Body"],
    ))
    story.append(Paragraph("Educación / Learn", styles["H2"]))
    story.append(Paragraph(
        "Guías de onboarding: qué es una wallet, non-custodial vs custodial, protección de seed phrase, "
        "primeros pasos y FAQ. Reduce fricción de adopción para usuarios nuevos.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # ========== 08 BUSINESS ==========
    story.append(SectionBar("08", "Suite empresarial (Business)"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Infraestructura de pagos y finanzas para negocios modernos: más que una wallet de consumo.",
        styles["Body"],
    ))
    story.append(product_card(
        "RSC Business Wallet",
        "Billetera empresarial con control y reportes",
        "Diseñada para equipos: multi-usuario, roles, límites, aprobaciones y reporting.",
        [
            "Roles: Administrador, Gerente, Operador — permisos granulares.",
            "Límites de pago diarios/semanales/mensuales.",
            "Flujos de aprobación multi-firma operativa para montos sensibles.",
            "Historial y reportes orientados a conciliación.",
        ],
        styles,
    ))
    story.append(Paragraph("RSC Payments (comercio)", styles["H2"]))
    story.extend(bullets([
        "Cobros con QR y liquidación rápida.",
        "Estados de confirmación claros para caja y back-office.",
        "Integración con e-commerce, apps y TPV / POS.",
    ], styles))
    story.append(Paragraph("API de pagos", styles["H2"]))
    story.append(Paragraph(
        "Interfaces para integrar cobros en aplicaciones propias, marketplaces y puntos de venta. "
        "Pensada para developers de producto y partners de integración, con seguridad y documentación "
        "alineadas al stack del ecosistema.",
        styles["Body"],
    ))
    story.append(Paragraph("Facturación / Reports", styles["H2"]))
    story.append(Paragraph(
        "Herramientas de facturación e informes financieros para operaciones comerciales sobre "
        "los rieles RSC — trazabilidad y exportación para contabilidad.",
        styles["Body"],
    ))
    story.append(Paragraph("Casos de uso comerciales", styles["H2"]))
    story.extend(bullets([
        "Retail y comercio físico con QR.",
        "Plataformas digitales y e-commerce.",
        "Remesas empresariales y pagos a proveedores.",
        "Marketplaces que necesitan liquidación rápida y auditable.",
    ], styles))
    story.append(PageBreak())

    # ========== 09 P2P ESCROW ==========
    story.append(SectionBar("09", "RSC P2P y RSC Escrow"))
    story.append(Spacer(1, 3 * mm))
    story.append(product_card(
        "RSC P2P",
        "Marketplace peer-to-peer / rails institucionales",
        "Infraestructura de trading peer-to-peer sofisticada para instituciones financieras, "
        "fondos y brokers. Enfocado en liquidez, claridad de mercado y liquidación segura.",
        [
            "Trading de alto volumen con matching avanzado.",
            "Infraestructura de mercado: precios, order book, ejecución.",
            "Orientación a compliance (KYC/AML) en el relato institucional.",
            "Casos: OTC institucional, conversión, liquidez entre contrapartes.",
        ],
        styles,
    ))
    story.append(product_card(
        "RSC Escrow",
        "Transacciones digitales seguras",
        "Rails que retienen valor hasta que todas las partes cumplen condiciones — construidos "
        "para confianza, automatización y operaciones de alto ticket (incluido real estate "
        "cuando Reeskova opera flujos escrow-ready).",
        [
            "Custodia condicional del valor hasta hitos contractuales.",
            "Reducción de riesgo de contraparte en P2P y deals offline.",
            "Complemento natural de Reeskova y del mercado P2P.",
            "Base para dispute resolution y procesos auditables.",
        ],
        styles,
    ))
    story.append(Paragraph(
        "Para inversores: P2P + Escrow son motores de volumen y confianza. Monetizan infraestructura "
        "de mercado y reducen fricción en operaciones que hoy dependen de intermediarios caros o lentos.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # ========== 10 CORPORATE ==========
    story.append(SectionBar("10", "RSC Corporate"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Soluciones y servicios enterprise", styles["Tagline"]))
    story.append(Paragraph(
        "RSC Corporate ofrece servicios y soluciones blockchain empresariales para grandes "
        "instituciones que necesitan control, privacidad y acompañamiento extremo a extremo.",
        styles["Body"],
    ))
    story.append(Paragraph("Líneas de servicio", styles["H2"]))
    corp = [
        ["Línea", "Entregables"],
        ["Consultoría blockchain", "Estrategia, roadmap, evaluación de seguridad, guía de implementación"],
        ["Infraestructura dedicada", "Redes privadas, configuración a medida, managed services 24/7"],
        ["Integraciones privadas", "ERP/CRM, sync en tiempo real, apps y smart contracts a medida"],
        ["Soporte enterprise", "Soporte 24/7, account manager, SLA prioritario, capacitación"],
    ]
    story.append(info_table(corp, styles, [50 * mm, 120 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "Este brazo convierte la tecnología del grupo en ingresos B2B recurrentes (servicios "
        "gestionados, proyectos de integración y redes privadas), complementando la adopción "
        "consumer de wallet/mining.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # ========== 11 TOKEN ==========
    story.append(SectionBar("11", "REESK (RSK) — Token nativo"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "REESK (ticker RSK) es el token nativo de RSC Chain. Su rol es alinear incentivos entre "
        "usuarios, validadores/participantes de red, builders e instituciones.",
        styles["Body"],
    ))
    story.append(Paragraph("Utilidad", styles["H2"]))
    story.extend(bullets([
        "Fees de red — pago de comisiones en el ecosistema.",
        "Staking — bloqueo de tokens para apoyar la red y obtener recompensas (APY comunicado hasta ~5% anual según reglas de producto; lock mínimo ilustrativo 30 días / unstake 7 días).",
        "Gobernanza / participación — voz en la evolución del ecosistema donde aplique.",
        "Acceso a utilidades — mining rewards, eventos y servicios del stack.",
    ], styles))
    story.append(Paragraph("Venta / liquidez (wRSK)", styles["H2"]))
    story.append(Paragraph(
        "Existe una narrativa y producto de venta pública de wRSK en BSC (compra con USDT vía "
        "MetaMask), con esquema de vesting comunicado (p. ej. 25% inmediato y 75% a lo largo "
        "de 6 meses). wRSK actúa como representación/puente de liquidez hacia el ecosistema REESK. "
        "Los términos exactos de smart contracts, supply y vesting deben verificarse en la "
        "documentación on-chain y legal vigente al momento de cualquier inversión.",
        styles["Body"],
    ))
    story.append(Paragraph(
        "Aviso: este documento es informativo y no constituye oferta de valores, consejo de "
        "inversión ni solicitación. Toda participación en tokens implica riesgo de pérdida de capital.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # ========== 12 MINING ==========
    story.append(SectionBar("12", "Mining, staking y recompensas"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Participación en la red", styles["H2"]))
    story.append(Paragraph(
        "Además del staking on-product, RSC Group opera una capa de participación y recompensas "
        "que incluye minería móvil (app oficial en Google Play: RSC Mining), dashboard web, "
        "pools, earnings, referidos y eventos temporales (p. ej. campañas Snow Mining / Christmas).",
        styles["Body"],
    ))
    story.extend(bullets([
        "Sesiones de mining (p. ej. ventanas de 24h) con métricas de earnings.",
        "Programa de referidos (orden de magnitud comunicado ~10% según implementación).",
        "Eventos con mecánicas de rareza / engagement para crecimiento de comunidad.",
        "Integración con wallet y utilidades del ecosistema.",
    ], styles))
    story.append(Paragraph("Por qué importa para el negocio", styles["H2"]))
    story.append(Paragraph(
        "Mining y rewards son motores de adquisición y retención de usuarios. Alimentan la base "
        "consumer que luego usa wallet, pagos y — a escala — demanda liquidez y servicios P2P/escrow. "
        "Para inversores, es el embudo de adopción retail del ecosistema.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # ========== 13 DEVELOPERS ==========
    story.append(SectionBar("13", "Plataforma para desarrolladores"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "RSC Group abre la infraestructura a builders: documentación, APIs/SDKs, testnet/faucet "
        "y roadmap técnico público.",
        styles["Body"],
    ))
    story.extend(bullets([
        "Developer Docs — guías, RPC, nodos, patrones REST/WebSocket.",
        "APIs & SDKs — wallet, pagos, smart contracts / integración de apps.",
        "Testnet / Faucet — entorno de prueba sin riesgo de mainnet.",
        "Roadmap técnico — transparencia de evolución de red y producto.",
        "GitHub (rscchain) — superficie open / colaboración.",
    ], styles))
    story.append(Paragraph(
        "Una plataforma abierta multiplica el valor de la chain: terceros construyen dApps, "
        "integraciones comerciales y herramientas verticales sobre los mismos rieles.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # ========== 14 SECURITY ==========
    story.append(SectionBar("14", "Seguridad y cumplimiento"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "La seguridad es parte del producto, no un banner. El modelo non-custodial coloca el "
        "control de claves en el usuario; la plataforma aporta capas de protección y mejores prácticas.",
        styles["Body"],
    ))
    story.append(Paragraph("Capas de seguridad (productos consumer)", styles["H2"]))
    story.extend(bullets([
        "Non-custodial — RSC no custodia fondos del usuario.",
        "Backup con frase semilla (seed) — recuperación responsable offline.",
        "PIN / biometría / auto-lock — protección de dispositivo.",
        "Recordatorios anti-phishing y verificación de direcciones.",
        "Transacciones con costos visibles y estados claros.",
    ], styles))
    story.append(Paragraph("Orientación institucional", styles["H2"]))
    story.extend(bullets([
        "Arquitectura de seguridad multicapa en RSC Chain.",
        "Narrativa de compliance KYC/AML en mercados institucionales.",
        "Redes privadas y managed infrastructure vía RSC Corporate.",
        "Documentación técnica adicional: post-quantum, ZKP, firewall L7, behavioral analysis (GitBook).",
    ], styles))
    story.append(Paragraph(
        "La seguridad final también depende del cuidado del usuario con su frase semilla y "
        "dispositivo. En contextos enterprise, se definen responsabilidades compartidas "
        "(cliente ↔ RSC) según el contrato de servicio.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # ========== 15 ARCHITECTURE ==========
    story.append(SectionBar("15", "Arquitectura tecnológica"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Vista simplificada del stack para due diligence técnica y de producto:",
        styles["Body"],
    ))
    arch = [
        ["Capa", "Componentes", "Notas"],
        ["Marca / Web corporativa", "Sitio RSC Group (React/Vite), i18n EN/ES", "Narrativa inversores y clientes"],
        ["Consumer web", "rsc-web: wallet, mining, staking, P2P, explorer", "Experiencia usuario + campañas"],
        ["Mobile", "App RSC Mining (Android / Play Store)", "Adquisición y engagement"],
        ["Backend plataforma", "APIs, Supabase/Postgres, sesiones mining, referidos", "Persistencia y ops"],
        ["Chain API", "API de RSC Chain (infra cloud)", "Liquidación y operaciones de red"],
        ["Token sale", "Frontend wRSK + contratos BSC / MetaMask", "Liquidez y distribución"],
        ["Admin / Mission Control", "Paneles ops, GraphQL, RBAC, treasury/campaigns", "Operación interna"],
        ["Soporte", "Chatbot IA + escalado humano", "Atención al usuario"],
    ]
    story.append(info_table(arch, styles, [42 * mm, 70 * mm, 58 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Capacidades transversales del grupo", styles["H2"]))
    story.extend(bullets([
        "Blockchain — liquidación segura y verificable.",
        "IA — matching (Reeskova), automatización, soporte y detección de anomalías (cadena).",
        "Cloud — disponibilidad y escala global.",
        "Security — defensa en profundidad en identidad y transacciones.",
        "Data Analytics — insight de mercados, activos y operaciones.",
        "APIs — composición para partners e instituciones.",
    ], styles))
    story.append(PageBreak())

    # ========== 16 AUDIENCES ==========
    story.append(SectionBar("16", "Audiencias y casos de uso"))
    story.append(Spacer(1, 3 * mm))
    aud = [
        ["Audiencia", "Qué obtiene", "Productos clave"],
        ["Individuos", "Dinero digital cotidiano con control de claves", "Wallet, QR, remesas, staking, mining, Learn"],
        ["Empresas / comercios", "Cobros, conciliación, APIs, roles", "Business Wallet, Payments, API, Billing"],
        ["Instituciones", "Rails de alto volumen y compliance", "Chain, P2P, Escrow, Corporate, RSK"],
        ["Real estate", "Marketplace + settlement confiable", "Reeskova (+ Escrow / Chain)"],
        ["Developers", "Construir sobre la red", "Docs, APIs, testnet, GitHub"],
        ["Inversores / token", "Exposición al ecosistema y utilidad RSK", "REESK / wRSK, equity narrative del grupo"],
    ]
    story.append(info_table(aud, styles, [35 * mm, 70 * mm, 65 * mm]))
    story.append(Spacer(1, 5 * mm))
    story.append(Paragraph(
        "Una cadena, cuatro entradas claras: Personas · Empresas · Instituciones · Developers. "
        "Cada ruta enlaza a capacidades concretas sin diluir la marca corporativa.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # ========== 17 INVESTORS ==========
    story.append(SectionBar("17", "Propuesta de valor para inversores"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Por qué RSC Group es una tesis multiproducto", styles["H2"]))
    story.extend(bullets([
        "Diversificación interna — real estate + fintech + infra + markets, no un solo KPI de wallet.",
        "Shared infrastructure — menor costo marginal al lanzar el siguiente producto sobre Chain/APIs.",
        "Embudo consumer → enterprise — mining/wallet alimentan adopción; Corporate/P2P monetizan B2B.",
        "Token utility alineada — RSK conecta fees, staking y participación con uso real de plataforma.",
        "Marca institucional — navy, compliance narrative, vertical Reeskova premium (no puro hype).",
        "Plataforma abierta — developers y partners amplían el ecosistema sin que todo lo construya el core team.",
    ], styles))
    story.append(Paragraph("Ángulos de diligencia recomendados", styles["H2"]))
    dd = [
        ["Área", "Preguntas clave"],
        ["Producto", "¿Cuáles módulos están en producción vs. roadmap? Métricas de usuarios activos / TVL / volumen P2P."],
        ["Tecnología", "Auditorías de contratos, estado real de consenso/TPS, dependencia BSC vs. chain nativa."],
        ["Tokenomics", "Supply, vesting, utilidad real de fees, inflación de rewards/mining."],
        ["Legal / compliance", "Jurisdicción, KYC/AML en P2P, naturaleza legal de wRSK/sale."],
        ["Go-to-market", "Canales (Play Store, social @Reeskcap), partnerships Reeskova, pipeline Corporate."],
        ["Equipo & ops", "Mission Control, treasury, soporte, capacidad de entrega del roadmap 2026+."],
    ]
    story.append(info_table(dd, styles, [35 * mm, 135 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "Este briefing facilita la conversación inicial. Un data room completo (métricas, "
        "contratos, auditorías, cap table) debe solicitarse al equipo de RSC Group en el "
        "proceso formal de inversión o partnership.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # ========== 18 COMPANIES ==========
    story.append(SectionBar("18", "Propuesta de valor para empresas"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Las compañías pueden entrar al ecosistema por el camino que mejor encaje con su operación:",
        styles["Body"],
    ))
    paths = [
        ["Camino", "Ideal para", "Cómo empezar"],
        ["Cobros digitales", "Retail, food, e-commerce", "Business Wallet + QR Payments"],
        ["Integración API", "Plataformas y fintechs", "API de pagos / SDKs"],
        ["Liquidación / P2P", "Brokers, fondos, desks", "Mercado P2P + Escrow"],
        ["Real estate tech", "Agencias, developers, proptech", "Reeskova (+ escrow-ready)"],
        ["Infra privada", "Bancos, corporates regulados", "RSC Corporate / redes dedicadas"],
        ["Build on chain", "Equipos de producto / Web3", "Docs, testnet, APIs"],
    ]
    story.append(info_table(paths, styles, [38 * mm, 55 * mm, 77 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Beneficios operativos", styles["H2"]))
    story.extend(bullets([
        "Misma infraestructura para clientes finales y back-office.",
        "Estados de pago claros (pending/confirmed) para conciliación.",
        "Roles y límites para control interno.",
        "Opción de pasar de piloto QR a integración API y, si aplica, a red privada.",
        "Soporte enterprise y account management en el tramo Corporate.",
    ], styles))
    story.append(PageBreak())

    # ========== 19 ROADMAP ==========
    story.append(SectionBar("19", "Roadmap y trayectoria"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Timeline comunicada en la narrativa de producto (secuencia ilustrativa 2026+):",
        styles["Body"],
    ))
    road = [
        ["Fase", "Foco"],
        ["Reeskova", "Producto estrella real estate — marketplace y marca premium"],
        ["Wallet", "Puerta consumer non-custodial madura"],
        ["Escrow", "Rails de confianza para deals de alto valor"],
        ["P2P", "Mercado y liquidez entre contrapartes"],
        ["Chain", "Consolidación de infraestructura y métricas de red"],
        ["IA", "Matching, automatización y seguridad inteligente cross-product"],
        ["Expansión global", "Ciudades, idiomas, partnerships institucionales"],
    ]
    story.append(info_table(road, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Visión de plataforma (más allá de wallet)", styles["H2"]))
    story.extend(bullets([
        "Wallet ↔ Rewards / Mining / Events — engagement continuo.",
        "Wallet ↔ Bridge (roadmap) — interoperabilidad con otras redes.",
        "Wallet ↔ RSC Bank / Payments (visión) — experiencia bancaria cripto-first.",
    ], styles))
    story.append(PageBreak())

    # ========== 20 CONTACT ==========
    story.append(SectionBar("20", "Contacto y próximos pasos"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Si representa un fondo, family office, empresa o institución interesada en el ecosistema "
        "RSC Group, los siguientes pasos recomendados son:",
        styles["Body"],
    ))
    story.extend(bullets([
        "Revisar este overview con su equipo técnico y de inversión.",
        "Solicitar demo de producto (Wallet / Reeskova / Business / P2P según interés).",
        "Pedir data room: métricas, tokenomics detallado, contratos, legal.",
        "Agendar reunión con el equipo Corporate / Partnerships.",
        "Para builders: abrir documentación y testnet.",
    ], styles))
    story.append(Paragraph("Canales", styles["H2"]))
    contact = [
        ["Canal", "Referencia"],
        ["Web corporativa", "rscgroup.com"],
        ["RSC Chain", "rscchain.com"],
        ["X / Twitter", "@Reeskcap"],
        ["Telegram", "t.me/RSCchain"],
        ["GitHub", "github.com/rscchain"],
        ["Contacto / alianzas", "Formulario y sección Contact en el sitio corporativo"],
        ["Prensa", "Media kit y comunicados en la sección Press"],
    ]
    story.append(info_table(contact, styles, [45 * mm, 125 * mm]))
    story.append(Spacer(1, 8 * mm))
    story.append(ColoredBox(
        "¿Listo para construir el futuro?",
        "Explora las plataformas que RSC Group construye para real estate, finanzas e infraestructura digital.",
        height=24 * mm,
        title_size=14,
        sub_size=9,
    ))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(
        f"© {year} RSC Group. Todos los derechos reservados. Documento informativo. "
        "Non-custodial: RSC no custodia fondos de usuarios finales. Protege tu frase de recuperación. "
        "La información de producto y métricas puede evolucionar; valide siempre contra fuentes oficiales "
        "y documentación vigente antes de tomar decisiones de inversión o integración.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # ========== ANNEX ==========
    story.append(SectionBar("A", "Anexo — Glosario rápido"))
    story.append(Spacer(1, 3 * mm))
    gloss = [
        ["Término", "Definición breve"],
        ["RSC Group", "Empresa tecnológica matriz del ecosistema"],
        ["Reeskova", "Marketplace inmobiliario digital del grupo"],
        ["RSC Chain", "Blockchain / infraestructura de liquidación"],
        ["REESK / RSK", "Token nativo de utilidad en el ecosistema"],
        ["wRSK", "Representación / venta en BSC vinculada a REESK"],
        ["Non-custodial", "El usuario controla las claves privadas"],
        ["Escrow", "Custodia condicional hasta cumplir condiciones"],
        ["P2P", "Intercambio peer-to-peer entre contrapartes"],
        ["Staking", "Bloqueo de tokens para seguridad de red y rewards"],
        ["Mining (plataforma)", "Participación/recompensas vía app/web del ecosistema"],
        ["QR Payments", "Pagos por código QR sobre RSC Chain"],
        ["Business Wallet", "Wallet multi-usuario con roles para empresas"],
        ["RSC Corporate", "Servicios enterprise, redes privadas, soporte"],
        ["Finality", "Momento en que una tx se considera irreversible"],
        ["TPS", "Transacciones por segundo (capacidad de red)"],
        ["KYC / AML", "Conozca a su cliente / anti-lavado de dinero"],
        ["Seed phrase", "Frase de recuperación de la wallet"],
    ]
    story.append(info_table(gloss, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(
        "Fin del documento — RSC Group Overview para Inversores y Empresas",
        styles["BodyCenter"],
    ))
    story.append(Paragraph(
        "«Una empresa. Múltiples plataformas. Una infraestructura compartida.»",
        styles["Callout"],
    ))

    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    print(f"PDF generated: {OUTPUT}")
    return OUTPUT


if __name__ == "__main__":
    build()
