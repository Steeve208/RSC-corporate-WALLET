#!/usr/bin/env python3
"""Generate RSC Group investor & company overview PDF (English)."""

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
    "RSC_Group_Overview_Investors_Companies_EN.pdf",
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
        "RSC GROUP  ·  Corporate overview for investors and companies (EN)",
    )
    canv.setFillColor(LIGHT_BG)
    canv.rect(0, 0, PAGE_W, 10 * mm, fill=1, stroke=0)
    canv.setFillColor(MUTED)
    canv.setFont("DejaVu", 7.5)
    canv.drawString(MARGIN, 4 * mm, "Confidential — Informational use  |  rscgroup.com  ·  rscchain.com")
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
        title="RSC Group — Overview for Investors and Companies (EN)",
        author="RSC Group",
        subject="Corporate overview of the RSC Group ecosystem",
    )

    story = []
    year = datetime.now().year

    # COVER
    story.append(Spacer(1, 25 * mm))
    story.append(ColoredBox(
        "RSC GROUP",
        "Building the Next Generation of Digital Platforms",
        height=42 * mm,
        title_size=26,
        sub_size=11,
    ))
    story.append(Spacer(1, 12 * mm))
    story.append(Paragraph("Corporate presentation document", styles["H1"]))
    story.append(Paragraph(
        "What RSC Group is, how its ecosystem works, and what each component does — "
        "prepared for investors, strategic partners, companies, and institutions.",
        styles["Body"],
    ))
    story.append(Spacer(1, 8 * mm))

    meta_rows = [
        ["Document type", "Corporate overview / Investment briefing"],
        ["Audience", "Investors · Companies · Institutions · Partners"],
        ["Language", "English"],
        ["Version", f"{year}.1-EN"],
        ["Websites", "rscgroup.com  ·  rscchain.com"],
        ["Social", "@Reeskcap  ·  t.me/RSCchain  ·  github.com/rscchain"],
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
        "“We don't build apps. We build digital ecosystems.”",
        styles["Callout"],
    ))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(
        "This document describes RSC Group's business and product architecture: "
        "Reeskova (real estate), RSC Chain (blockchain infrastructure), RSC Wallet, "
        "payments, P2P, Escrow, Corporate, Mining, the REESK (RSK) token, and the suites for "
        "companies, institutions, and developers.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # TOC
    story.append(SectionBar("00", "Table of contents"))
    story.append(Spacer(1, 4 * mm))
    toc = [
        ("01", "Executive summary"),
        ("02", "What is RSC Group"),
        ("03", "Vision, mission, and philosophy"),
        ("04", "Ecosystem map"),
        ("05", "Reeskova — Real Estate"),
        ("06", "RSC Chain — Blockchain infrastructure"),
        ("07", "RSC Wallet and products for individuals"),
        ("08", "Business suite"),
        ("09", "RSC P2P and RSC Escrow"),
        ("10", "RSC Corporate"),
        ("11", "REESK (RSK) — Native token"),
        ("12", "Mining, staking, and rewards"),
        ("13", "Developer platform"),
        ("14", "Security and compliance"),
        ("15", "Technology architecture"),
        ("16", "Audiences and use cases"),
        ("17", "Value proposition for investors"),
        ("18", "Value proposition for companies"),
        ("19", "Roadmap and trajectory"),
        ("20", "Contact and next steps"),
        ("A", "Appendix — Quick glossary"),
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
    story.append(SectionBar("01", "Executive summary"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "RSC Group is a multi-product technology company that builds digital platforms for "
        "real estate, digital finance, secure transactions, and decentralized infrastructure. "
        "It is not a single product: it is an integrated stack under one corporate brand and "
        "shared infrastructure (RSC Chain).",
        styles["Body"],
    ))
    story.append(Paragraph(
        "The core thesis is simple: <b>one company, multiple platforms</b>. Each product "
        "works independently and becomes stronger when connected to the rest of the "
        "ecosystem — wallet, payments, escrow, P2P, real estate, and corporate services "
        "share rails, identity, and settlement.",
        styles["Body"],
    ))
    story.append(Paragraph("Business pillars", styles["H2"]))
    pillars = [
        ["Pillar", "Description", "Key benefit"],
        ["Reeskova", "Digital real-estate marketplace with AI, verified listings, and escrow-ready flows", "Entry into real estate and capital"],
        ["RSC Chain", "Enterprise blockchain infrastructure (high TPS, fast finality, compliance)", "Shared settlement rails"],
        ["Digital finance", "Wallet, QR payments, remittances, staking, mining", "Retail adoption and engagement"],
        ["Markets & trust", "Institutional P2P + digital Escrow", "Secure B2B/B2C settlement"],
        ["Enterprise", "RSC Corporate: consulting, private networks, ERP/CRM integrations", "B2B / institutional revenue"],
        ["REESK (RSK) token", "Native utility: fees, staking, governance, participation", "Economic alignment of the ecosystem"],
    ]
    story.append(info_table(pillars, styles, [32 * mm, 95 * mm, 43 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Platform signals (design targets)", styles["H2"]))
    metrics = [
        ["Metric", "Target", "Meaning"],
        ["Throughput", "10,000+ TPS (target)", "Capacity for institutional load"],
        ["Confirmation", "< 2 seconds (target)", "Payments and settlement UX"],
        ["Availability", "99.9% – 99.99%", "Continuous operation"],
        ["Custody model", "Non-custodial", "Users control their keys"],
        ["Product coverage", "10+ products / modules", "Multi-product portfolio"],
    ]
    story.append(info_table(metrics, styles, [40 * mm, 50 * mm, 80 * mm]))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Note: performance figures represent design targets and platform capacity "
        "communicated in product documentation; they should be validated in the context of each "
        "deployment and technical due diligence.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # 02
    story.append(SectionBar("02", "What is RSC Group"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "RSC Group is the parent technology brand behind a portfolio of digital platforms. "
        "Its proposition is not limited to “another wallet” or “another chain”: it organizes "
        "vertical products (real estate, payments, P2P trading, escrow) on a horizontal layer "
        "of infrastructure, security, APIs, and data.",
        styles["Body"],
    ))
    story.append(Paragraph("Positioning", styles["H2"]))
    story.append(Paragraph(
        "<b>Tagline:</b> Building the Next Generation of Digital Platforms.<br/>"
        "<b>Manifesto:</b> We don't build apps. We build digital ecosystems.<br/>"
        "<b>Brand color:</b> Navy #081A33 — institutional sobriety, not crypto-hype aesthetics.",
        styles["Body"],
    ))
    story.append(Paragraph("Problems it solves", styles["H2"]))
    story.extend(bullets([
        "Fragmented digital finance: wallet, payments, remittances, and staking live in silos.",
        "Cross-border and remittance friction: intermediaries, opaque costs, and delays.",
        "Institutional need for rails: P2P, escrow, compliance, and private networks.",
        "Digital real estate: discovery, trust, verified listings, and secure settlement.",
        "Network participation: mining, referrals, staking, and native-token utility.",
    ], styles))
    story.append(Paragraph("Group brands", styles["H2"]))
    brands = [
        ["Brand", "Role"],
        ["RSC Group", "Parent company / corporate brand (rscgroup.com)"],
        ["Reeskova", "Flagship digital real-estate product"],
        ["RSC Chain", "Blockchain infrastructure and crypto brand (rscchain.com)"],
        ["REESK / RSK / wRSK", "Native token (and BSC sale representation when applicable)"],
        ["RSC Wallet / RSC Mining", "Consumer products for assets and network participation"],
    ]
    story.append(info_table(brands, styles, [45 * mm, 125 * mm]))
    story.append(PageBreak())

    # 03
    story.append(SectionBar("03", "Vision, mission, and philosophy"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Vision", styles["H2"]))
    story.append(Paragraph(
        "To create a decentralized financial ecosystem that empowers individuals and institutions "
        "worldwide, making financial services accessible, transparent, and secure for everyone.",
        styles["Body"],
    ))
    story.append(Paragraph("Mission", styles["H2"]))
    story.append(Paragraph(
        "To build and maintain RSC Chain infrastructure, delivering innovative blockchain "
        "solutions that enable secure, fast, and cost-effective financial transactions while "
        "fostering financial inclusion and enabling next-generation digital platforms "
        "(including real estate with Reeskova).",
        styles["Body"],
    ))
    story.append(Paragraph("Philosophy", styles["H2"]))
    phil = [
        ["Principle", "What it means in practice"],
        ["Decentralization", "More transparent, fair, and resilient systems; fewer single points of failure."],
        ["Security first", "Protection of funds and data above feature velocity."],
        ["Open innovation", "Developers, companies, and institutions can build and integrate together."],
    ]
    story.append(info_table(phil, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Leadership values", styles["H2"]))
    story.extend(bullets([
        "Innovation — products with real technological ambition.",
        "Integrity — clear communication with users, partners, and investors.",
        "Technology — blockchain is one layer; the stack includes AI, cloud, analytics, and APIs.",
        "Trust — escrow, verification, and non-custodial as design, not marketing.",
        "Execution — sequenced roadmap: flagship products → global expansion.",
    ], styles))
    story.append(PageBreak())

    # 04
    story.append(SectionBar("04", "Ecosystem map"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "RSC Group sits at the center. Products expand in orbit and reconnect through "
        "shared infrastructure (chain, APIs, security, identity).",
        styles["Body"],
    ))
    eco = [
        ["Component", "Category", "Primary function"],
        ["Reeskova", "Real Estate", "Marketplace: buy, sell, rent, invest"],
        ["RSC Chain", "Infrastructure", "Enterprise blockchain, settlement, consensus"],
        ["RSC Wallet", "Consumer Finance", "Non-custodial assets, send/receive, QR, staking"],
        ["Payments & QR", "Payments", "Everyday pay/collect flows with clear status"],
        ["Remittances", "Payments", "Cross-border P2P transfers"],
        ["Business Wallet / API", "B2B", "Collections, roles, reporting, POS/e-commerce integration"],
        ["RSC P2P", "Markets", "Institutional peer-to-peer trading / marketplace"],
        ["RSC Escrow", "Trust", "Conditional custody until conditions are met"],
        ["RSC Corporate", "Enterprise", "Consulting, private networks, 24/7 support"],
        ["REESK (RSK)", "Tokenomics", "Fees, staking, governance, network utility"],
        ["Mining & Rewards", "Participation", "Mobile participation, referrals, events"],
        ["Developer Platform", "Builders", "Docs, APIs/SDKs, testnet, faucet, roadmap"],
    ]
    story.append(info_table(eco, styles, [40 * mm, 35 * mm, 95 * mm]))
    story.append(Spacer(1, 5 * mm))
    story.append(Paragraph("How everything connects", styles["H2"]))
    story.append(Paragraph(
        "The wallet is the consumer gateway. RSC Chain coordinates identity, payments, "
        "utilities, and the roadmap toward bridge and bank-grade payment experiences. "
        "Reeskova delivers the real-estate vertical and leans on group capabilities "
        "(AI, analytics, escrow-ready, blockchain-ready). P2P and Escrow provide trust rails "
        "for institutions and high-value operations. Corporate closes the enterprise loop "
        "with private networks and integrations.",
        styles["Body"],
    ))
    story.append(Paragraph(
        "Cross-cutting technology layers: Blockchain · Artificial Intelligence · Cloud · "
        "Security · Data Analytics · APIs · Open platform.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 05
    story.append(SectionBar("05", "Reeskova — Real Estate"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("The future of real estate", styles["Tagline"]))
    story.append(Paragraph(
        "Reeskova is RSC Group's flagship real-estate marketplace. It enables buying, selling, "
        "renting, and investing through a premium digital marketplace designed for the next "
        "generation of properties and capital. It is not a static classifieds board: it runs on "
        "group technology (AI, big data, cloud, analytics, escrow-ready, and blockchain-ready).",
        styles["Body"],
    ))
    story.append(Paragraph("Value proposition", styles["H2"]))
    story.extend(bullets([
        "AI Search — find properties based on lifestyle and investment intent.",
        "Verified Listings — featured inventory reviewed so buyers can move with confidence.",
        "Secure Transactions — safer negotiations and escrow-ready flows.",
        "Smart Investment — signals and analytics without noise to evaluate opportunity.",
        "Interactive map — premium geographic discovery with filters (buy / rent / invest).",
    ], styles))
    story.append(Paragraph("User journey", styles["H2"]))
    journey = [
        ["Step", "Action", "Outcome"],
        ["1. Search", "AI-assisted filters + live map", "Relevant shortlist"],
        ["2. Visit", "Schedule visits with trusted professionals", "Physical validation"],
        ["3. Negotiate", "Conversations and proposals in a premium flow", "Structured offer"],
        ["4. Secure Deal", "Safer transactional infrastructure", "Close with confidence"],
        ["5. Move In", "Close with clarity", "Next chapter / asset"],
    ]
    story.append(info_table(journey, styles, [30 * mm, 75 * mm, 65 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Audiences", styles["H2"]))
    story.extend(bullets([
        "Buyers — explore, compare, and contact with a modern product experience.",
        "Agents — qualified leads, premium listing storytelling, CRM alignment.",
        "Developers — launch spotlights, rich media, and sales pipeline.",
        "Investors — ROI, yield, and growth framing with institutional sobriety.",
    ], styles))
    story.append(Paragraph(
        "Reeskova strengthens the RSC Group parent brand without distracting home seekers, "
        "and leaves room for the next ecosystem product (P2P, Escrow, future financial solutions).",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 06
    story.append(SectionBar("06", "RSC Chain — Blockchain infrastructure"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Enterprise blockchain infrastructure", styles["Tagline"]))
    story.append(Paragraph(
        "RSC Chain is high-performance blockchain infrastructure designed for institutional "
        "use. It combines enterprise-grade security, scalability, and compliance features to "
        "enable financial and settlement applications at scale.",
        styles["Body"],
    ))
    story.append(Paragraph("Core characteristics", styles["H2"]))
    story.extend(bullets([
        "High performance — optimized for high throughput and low latency.",
        "Enterprise security — multi-layer architecture and institutional key management.",
        "Regulatory compliance — KYC/AML orientation and reporting capabilities.",
        "Fast finality — confirmation with deterministic finality for settlement.",
        "Byzantine fault tolerance — resilience against failures and malicious actors.",
    ], styles))
    story.append(Paragraph("Layered architecture", styles["H2"]))
    layers = [
        ["Layer", "Responsibility"],
        ["Consensus", "Network security and transaction finality"],
        ["Execution", "High-performance environment for contracts and complex transactions"],
        ["Application", "APIs and tools for builders and institutions"],
    ]
    story.append(info_table(layers, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Institutional use cases", styles["H2"]))
    story.extend(bullets([
        "CBDC / central bank digital currencies — compliance, throughput, auditability.",
        "Cross-border payments — fast settlement, lower costs, 24/7 availability.",
        "Digital asset infrastructure — tokenization, institutional DeFi, smart contracts.",
    ], styles))
    story.append(Paragraph("Technical documentation (GitBook)", styles["H2"]))
    story.append(Paragraph(
        "RSC Chain documentation covers, among other modules: architecture, integrated AI, "
        "security (including post-quantum cryptography and ZKP in the technical narrative), "
        "hybrid consensus (PoW/PoS/VRF), P2P networking (Kademlia, Gossip, QUIC/Noise), storage, "
        "REST/WebSocket APIs, monitoring, and sector use cases (DeFi, gaming, healthcare, "
        "supply chain, government).",
        styles["Body"],
    ))
    story.append(Paragraph(
        "For investors: RSC Chain is the horizontal layer that monetizes and scales the rest of "
        "the portfolio — without it, wallet, payments, P2P, and escrow would be isolated products.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 07
    story.append(SectionBar("07", "RSC Wallet and products for individuals"))
    story.append(Spacer(1, 3 * mm))
    story.append(product_card(
        "RSC Wallet",
        "Non-custodial wallet to operate on RSC Chain",
        "The consumer gateway into the ecosystem. Manage assets, execute transactions, "
        "participate in staking, and access DeFi utilities from one surface. "
        "Non-custodial model: your keys, your control.",
        [
            "Send / receive RSK and compatible assets with Pending / Confirmed status.",
            "Balance, portfolio, and transparent exportable history.",
            "QR payments (ideal for commerce and daily life).",
            "Staking integrated into the product flow.",
            "Security: seed phrase, PIN, biometrics, auto-lock.",
        ],
        styles,
    ))
    story.append(Paragraph("QR Payments (RSC Payments)", styles["H2"]))
    story.append(Paragraph(
        "A fast, decentralized payment system on RSC Chain. Scan or generate a QR code, "
        "confirm, and send — without unnecessary intermediaries and with fees visible "
        "before confirmation.",
        styles["Body"],
    ))
    story.extend(bullets([
        "Use cases: pay friends, merchants, cafés, online stores.",
        "Real-time P2P transfers between RSC users.",
        "Full history and on-chain confirmation.",
    ], styles))
    story.append(Paragraph("Remittances / Transfers", styles["H2"]))
    story.append(Paragraph(
        "Send value globally with speed and control. Ideal for family transfers, freelancers, "
        "and recurring payments. Costs visible before confirmation; instant receipt between "
        "RSC Wallet users.",
        styles["Body"],
    ))
    story.append(Paragraph("Education / Learn", styles["H2"]))
    story.append(Paragraph(
        "Onboarding guides: what a wallet is, non-custodial vs custodial, seed-phrase protection, "
        "first steps, and FAQ. Reduces adoption friction for new users.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 08
    story.append(SectionBar("08", "Business suite"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Payments and finance infrastructure for modern businesses: more than a consumer wallet.",
        styles["Body"],
    ))
    story.append(product_card(
        "RSC Business Wallet",
        "Business wallet with controls and reporting",
        "Built for teams: multi-user access, roles, limits, approvals, and reporting.",
        [
            "Roles: Admin, Manager, Operator — granular permissions.",
            "Daily/weekly/monthly payment limits.",
            "Multi-approval operational flows for sensitive amounts.",
            "History and reports oriented to reconciliation.",
        ],
        styles,
    ))
    story.append(Paragraph("RSC Payments (merchant)", styles["H2"]))
    story.extend(bullets([
        "QR collections with fast settlement.",
        "Clear confirmation states for POS and back-office.",
        "Integration with e-commerce, apps, and POS / TPV.",
    ], styles))
    story.append(Paragraph("Payments API", styles["H2"]))
    story.append(Paragraph(
        "Interfaces to integrate collections into proprietary apps, marketplaces, and points of sale. "
        "Designed for product developers and integration partners, with security and documentation "
        "aligned to the ecosystem stack.",
        styles["Body"],
    ))
    story.append(Paragraph("Billing / Reports", styles["H2"]))
    story.append(Paragraph(
        "Billing tools and financial reports for commercial operations on RSC rails — "
        "traceability and export for accounting.",
        styles["Body"],
    ))
    story.append(Paragraph("Commercial use cases", styles["H2"]))
    story.extend(bullets([
        "Retail and physical commerce with QR.",
        "Digital platforms and e-commerce.",
        "Business remittances and supplier payments.",
        "Marketplaces that need fast, auditable settlement.",
    ], styles))
    story.append(PageBreak())

    # 09
    story.append(SectionBar("09", "RSC P2P and RSC Escrow"))
    story.append(Spacer(1, 3 * mm))
    story.append(product_card(
        "RSC P2P",
        "Peer-to-peer marketplace / institutional rails",
        "Sophisticated peer-to-peer trading infrastructure for financial institutions, "
        "funds, and brokers. Focused on liquidity, market clarity, and secure settlement.",
        [
            "High-volume trading with advanced matching.",
            "Market infrastructure: pricing, order book, execution.",
            "Compliance orientation (KYC/AML) in the institutional narrative.",
            "Use cases: institutional OTC, conversion, counterparty liquidity.",
        ],
        styles,
    ))
    story.append(product_card(
        "RSC Escrow",
        "Secure digital transactions",
        "Rails that hold value until all parties meet conditions — built for trust, "
        "automation, and high-ticket operations (including real estate when Reeskova "
        "runs escrow-ready flows).",
        [
            "Conditional custody of value until contractual milestones.",
            "Reduced counterparty risk in P2P and offline deals.",
            "Natural complement to Reeskova and the P2P market.",
            "Foundation for dispute resolution and auditable processes.",
        ],
        styles,
    ))
    story.append(Paragraph(
        "For investors: P2P + Escrow are engines of volume and trust. They monetize market "
        "infrastructure and reduce friction in operations that today depend on expensive or slow intermediaries.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 10
    story.append(SectionBar("10", "RSC Corporate"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Enterprise solutions and services", styles["Tagline"]))
    story.append(Paragraph(
        "RSC Corporate delivers enterprise blockchain services and solutions for large "
        "institutions that need control, privacy, and end-to-end support.",
        styles["Body"],
    ))
    story.append(Paragraph("Service lines", styles["H2"]))
    corp = [
        ["Line", "Deliverables"],
        ["Blockchain consulting", "Strategy, roadmap, security assessment, implementation guidance"],
        ["Dedicated infrastructure", "Private networks, custom configuration, managed services 24/7"],
        ["Private integrations", "ERP/CRM, real-time sync, custom apps and smart contracts"],
        ["Enterprise support", "24/7 support, account manager, priority SLA, training"],
    ]
    story.append(info_table(corp, styles, [50 * mm, 120 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "This arm converts group technology into recurring B2B revenue (managed services, "
        "integration projects, and private networks), complementing consumer adoption of wallet/mining.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 11
    story.append(SectionBar("11", "REESK (RSK) — Native token"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "REESK (ticker RSK) is the native token of RSC Chain. Its role is to align incentives among "
        "users, validators/network participants, builders, and institutions.",
        styles["Body"],
    ))
    story.append(Paragraph("Utility", styles["H2"]))
    story.extend(bullets([
        "Network fees — payment of commissions in the ecosystem.",
        "Staking — lock tokens to support the network and earn rewards (APY communicated up to ~5% annually per product rules; illustrative minimum lock 30 days / unstake 7 days).",
        "Governance / participation — voice in ecosystem evolution where applicable.",
        "Access to utilities — mining rewards, events, and stack services.",
    ], styles))
    story.append(Paragraph("Sale / liquidity (wRSK)", styles["H2"]))
    story.append(Paragraph(
        "There is a public sale narrative and product for wRSK on BSC (buy with USDT via "
        "MetaMask), with a communicated vesting scheme (e.g., 25% immediate and 75% over "
        "6 months). wRSK acts as a liquidity representation/bridge toward the REESK ecosystem. "
        "Exact smart-contract terms, supply, and vesting must be verified in the "
        "on-chain and legal documentation in force at the time of any investment.",
        styles["Body"],
    ))
    story.append(Paragraph(
        "Disclaimer: this document is informational and does not constitute an offer of securities, "
        "investment advice, or solicitation. Any participation in tokens involves risk of capital loss.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # 12
    story.append(SectionBar("12", "Mining, staking, and rewards"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Network participation", styles["H2"]))
    story.append(Paragraph(
        "In addition to in-product staking, RSC Group operates a participation and rewards layer "
        "that includes mobile mining (official Google Play app: RSC Mining), web dashboard, "
        "pools, earnings, referrals, and temporary events (e.g., Snow Mining / Christmas campaigns).",
        styles["Body"],
    ))
    story.extend(bullets([
        "Mining sessions (e.g., 24h windows) with earnings metrics.",
        "Referral program (communicated order of magnitude ~10% depending on implementation).",
        "Events with rarity / engagement mechanics for community growth.",
        "Integration with wallet and ecosystem utilities.",
    ], styles))
    story.append(Paragraph("Why it matters for the business", styles["H2"]))
    story.append(Paragraph(
        "Mining and rewards are acquisition and retention engines. They feed the consumer base "
        "that later uses wallet and payments and — at scale — demands liquidity and P2P/escrow "
        "services. For investors, this is the retail adoption funnel of the ecosystem.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 13
    story.append(SectionBar("13", "Developer platform"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "RSC Group opens the infrastructure to builders: documentation, APIs/SDKs, testnet/faucet, "
        "and a public technical roadmap.",
        styles["Body"],
    ))
    story.extend(bullets([
        "Developer Docs — guides, RPC, nodes, REST/WebSocket patterns.",
        "APIs & SDKs — wallet, payments, smart contracts / app integration.",
        "Testnet / Faucet — test environment without mainnet risk.",
        "Technical roadmap — transparency on network and product evolution.",
        "GitHub (rscchain) — open surface / collaboration.",
    ], styles))
    story.append(Paragraph(
        "An open platform multiplies chain value: third parties build dApps, "
        "commercial integrations, and vertical tools on the same rails.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 14
    story.append(SectionBar("14", "Security and compliance"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Security is part of the product, not a banner. The non-custodial model places key "
        "control with the user; the platform provides protection layers and best practices.",
        styles["Body"],
    ))
    story.append(Paragraph("Security layers (consumer products)", styles["H2"]))
    story.extend(bullets([
        "Non-custodial — RSC does not custody user funds.",
        "Seed-phrase backup — responsible offline recovery.",
        "PIN / biometrics / auto-lock — device protection.",
        "Anti-phishing reminders and address verification.",
        "Transactions with visible costs and clear status.",
    ], styles))
    story.append(Paragraph("Institutional orientation", styles["H2"]))
    story.extend(bullets([
        "Multi-layer security architecture on RSC Chain.",
        "KYC/AML compliance narrative in institutional markets.",
        "Private networks and managed infrastructure via RSC Corporate.",
        "Additional technical documentation: post-quantum, ZKP, L7 firewall, behavioral analysis (GitBook).",
    ], styles))
    story.append(Paragraph(
        "Final security also depends on the user's care with their seed phrase and "
        "device. In enterprise contexts, shared responsibilities "
        "(client ↔ RSC) are defined by the service agreement.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # 15
    story.append(SectionBar("15", "Technology architecture"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Simplified stack view for technical and product due diligence:",
        styles["Body"],
    ))
    arch = [
        ["Layer", "Components", "Notes"],
        ["Brand / Corporate web", "RSC Group site (React/Vite), i18n EN/ES", "Investor and customer narrative"],
        ["Consumer web", "rsc-web: wallet, mining, staking, P2P, explorer", "User experience + campaigns"],
        ["Mobile", "RSC Mining app (Android / Play Store)", "Acquisition and engagement"],
        ["Platform backend", "APIs, Supabase/Postgres, mining sessions, referrals", "Persistence and ops"],
        ["Chain API", "RSC Chain API (cloud infra)", "Settlement and network operations"],
        ["Token sale", "wRSK frontend + BSC contracts / MetaMask", "Liquidity and distribution"],
        ["Admin / Mission Control", "Ops panels, GraphQL, RBAC, treasury/campaigns", "Internal operations"],
        ["Support", "AI chatbot + human escalation", "User support"],
    ]
    story.append(info_table(arch, styles, [42 * mm, 70 * mm, 58 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Cross-cutting group capabilities", styles["H2"]))
    story.extend(bullets([
        "Blockchain — secure, verifiable settlement.",
        "AI — matching (Reeskova), automation, support, and anomaly detection (chain).",
        "Cloud — global availability and scale.",
        "Security — defense in depth for identity and transactions.",
        "Data Analytics — insight on markets, assets, and operations.",
        "APIs — composition for partners and institutions.",
    ], styles))
    story.append(PageBreak())

    # 16
    story.append(SectionBar("16", "Audiences and use cases"))
    story.append(Spacer(1, 3 * mm))
    aud = [
        ["Audience", "What they get", "Key products"],
        ["Individuals", "Everyday digital money with key control", "Wallet, QR, remittances, staking, mining, Learn"],
        ["Businesses / merchants", "Collections, reconciliation, APIs, roles", "Business Wallet, Payments, API, Billing"],
        ["Institutions", "High-volume rails and compliance", "Chain, P2P, Escrow, Corporate, RSK"],
        ["Real estate", "Marketplace + trusted settlement", "Reeskova (+ Escrow / Chain)"],
        ["Developers", "Build on the network", "Docs, APIs, testnet, GitHub"],
        ["Investors / token", "Exposure to the ecosystem and RSK utility", "REESK / wRSK, group equity narrative"],
    ]
    story.append(info_table(aud, styles, [35 * mm, 70 * mm, 65 * mm]))
    story.append(Spacer(1, 5 * mm))
    story.append(Paragraph(
        "One chain, four clear entry points: Individuals · Businesses · Institutions · Developers. "
        "Each path links to concrete capabilities without diluting the corporate brand.",
        styles["Body"],
    ))
    story.append(PageBreak())

    # 17
    story.append(SectionBar("17", "Value proposition for investors"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph("Why RSC Group is a multi-product thesis", styles["H2"]))
    story.extend(bullets([
        "Internal diversification — real estate + fintech + infra + markets, not a single wallet KPI.",
        "Shared infrastructure — lower marginal cost to launch the next product on Chain/APIs.",
        "Consumer → enterprise funnel — mining/wallet drive adoption; Corporate/P2P monetize B2B.",
        "Aligned token utility — RSK connects fees, staking, and participation with real platform use.",
        "Institutional brand — navy, compliance narrative, premium Reeskova vertical (not pure hype).",
        "Open platform — developers and partners expand the ecosystem without the core team building everything.",
    ], styles))
    story.append(Paragraph("Recommended diligence angles", styles["H2"]))
    dd = [
        ["Area", "Key questions"],
        ["Product", "Which modules are in production vs. roadmap? Active users / TVL / P2P volume metrics."],
        ["Technology", "Contract audits, real consensus/TPS status, BSC dependency vs. native chain."],
        ["Tokenomics", "Supply, vesting, real fee utility, rewards/mining inflation."],
        ["Legal / compliance", "Jurisdiction, KYC/AML in P2P, legal nature of wRSK/sale."],
        ["Go-to-market", "Channels (Play Store, social @Reeskcap), Reeskova partnerships, Corporate pipeline."],
        ["Team & ops", "Mission Control, treasury, support, delivery capacity for the 2026+ roadmap."],
    ]
    story.append(info_table(dd, styles, [35 * mm, 135 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(
        "This briefing facilitates the initial conversation. A full data room (metrics, "
        "contracts, audits, cap table) should be requested from the RSC Group team in the "
        "formal investment or partnership process.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # 18
    story.append(SectionBar("18", "Value proposition for companies"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Companies can enter the ecosystem through the path that best fits their operations:",
        styles["Body"],
    ))
    paths = [
        ["Path", "Ideal for", "How to start"],
        ["Digital collections", "Retail, food, e-commerce", "Business Wallet + QR Payments"],
        ["API integration", "Platforms and fintechs", "Payments API / SDKs"],
        ["Settlement / P2P", "Brokers, funds, desks", "P2P market + Escrow"],
        ["Real estate tech", "Agencies, developers, proptech", "Reeskova (+ escrow-ready)"],
        ["Private infra", "Banks, regulated corporates", "RSC Corporate / dedicated networks"],
        ["Build on chain", "Product / Web3 teams", "Docs, testnet, APIs"],
    ]
    story.append(info_table(paths, styles, [38 * mm, 55 * mm, 77 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Operational benefits", styles["H2"]))
    story.extend(bullets([
        "Same infrastructure for end customers and back-office.",
        "Clear payment states (pending/confirmed) for reconciliation.",
        "Roles and limits for internal control.",
        "Path from QR pilot to API integration and, if applicable, to a private network.",
        "Enterprise support and account management in the Corporate tier.",
    ], styles))
    story.append(PageBreak())

    # 19
    story.append(SectionBar("19", "Roadmap and trajectory"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "Timeline communicated in the product narrative (illustrative 2026+ sequence):",
        styles["Body"],
    ))
    road = [
        ["Phase", "Focus"],
        ["Reeskova", "Flagship real-estate product — marketplace and premium brand"],
        ["Wallet", "Mature non-custodial consumer gateway"],
        ["Escrow", "Trust rails for high-value deals"],
        ["P2P", "Market and liquidity between counterparties"],
        ["Chain", "Infrastructure consolidation and network metrics"],
        ["AI", "Matching, automation, and intelligent cross-product security"],
        ["Global expansion", "Cities, languages, institutional partnerships"],
    ]
    story.append(info_table(road, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("Platform vision (beyond the wallet)", styles["H2"]))
    story.extend(bullets([
        "Wallet ↔ Rewards / Mining / Events — continuous engagement.",
        "Wallet ↔ Bridge (roadmap) — interoperability with other networks.",
        "Wallet ↔ RSC Bank / Payments (vision) — crypto-first banking experience.",
    ], styles))
    story.append(PageBreak())

    # 20
    story.append(SectionBar("20", "Contact and next steps"))
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(
        "If you represent a fund, family office, company, or institution interested in the "
        "RSC Group ecosystem, recommended next steps are:",
        styles["Body"],
    ))
    story.extend(bullets([
        "Review this overview with your technical and investment teams.",
        "Request a product demo (Wallet / Reeskova / Business / P2P based on interest).",
        "Ask for a data room: metrics, detailed tokenomics, contracts, legal.",
        "Schedule a meeting with the Corporate / Partnerships team.",
        "For builders: open the documentation and testnet.",
    ], styles))
    story.append(Paragraph("Channels", styles["H2"]))
    contact = [
        ["Channel", "Reference"],
        ["Corporate web", "rscgroup.com"],
        ["RSC Chain", "rscchain.com"],
        ["X / Twitter", "@Reeskcap"],
        ["Telegram", "t.me/RSCchain"],
        ["GitHub", "github.com/rscchain"],
        ["Contact / alliances", "Form and Contact section on the corporate site"],
        ["Press", "Media kit and releases in the Press section"],
    ]
    story.append(info_table(contact, styles, [45 * mm, 125 * mm]))
    story.append(Spacer(1, 8 * mm))
    story.append(ColoredBox(
        "Ready to build the future?",
        "Explore the platforms RSC Group builds for real estate, finance, and digital infrastructure.",
        height=24 * mm,
        title_size=14,
        sub_size=9,
    ))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(
        f"© {year} RSC Group. All rights reserved. Informational document. "
        "Non-custodial: RSC does not custody end-user funds. Protect your recovery phrase. "
        "Product information and metrics may evolve; always validate against official sources "
        "and current documentation before making investment or integration decisions.",
        styles["Small"],
    ))
    story.append(PageBreak())

    # APPENDIX
    story.append(SectionBar("A", "Appendix — Quick glossary"))
    story.append(Spacer(1, 3 * mm))
    gloss = [
        ["Term", "Short definition"],
        ["RSC Group", "Parent technology company of the ecosystem"],
        ["Reeskova", "Group digital real-estate marketplace"],
        ["RSC Chain", "Blockchain / settlement infrastructure"],
        ["REESK / RSK", "Native utility token of the ecosystem"],
        ["wRSK", "BSC representation / sale linked to REESK"],
        ["Non-custodial", "The user controls private keys"],
        ["Escrow", "Conditional custody until conditions are met"],
        ["P2P", "Peer-to-peer exchange between counterparties"],
        ["Staking", "Locking tokens for network security and rewards"],
        ["Mining (platform)", "Participation/rewards via ecosystem app/web"],
        ["QR Payments", "QR-code payments on RSC Chain"],
        ["Business Wallet", "Multi-user wallet with roles for companies"],
        ["RSC Corporate", "Enterprise services, private networks, support"],
        ["Finality", "Point at which a tx is considered irreversible"],
        ["TPS", "Transactions per second (network capacity)"],
        ["KYC / AML", "Know Your Customer / Anti-Money Laundering"],
        ["Seed phrase", "Wallet recovery phrase"],
    ]
    story.append(info_table(gloss, styles, [40 * mm, 130 * mm]))
    story.append(Spacer(1, 8 * mm))
    story.append(Paragraph(
        "End of document — RSC Group Overview for Investors and Companies (EN)",
        styles["BodyCenter"],
    ))
    story.append(Paragraph(
        "“One company. Multiple platforms. Shared infrastructure.”",
        styles["Callout"],
    ))

    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    print(f"PDF generated: {OUTPUT}")
    return OUTPUT


if __name__ == "__main__":
    build()
