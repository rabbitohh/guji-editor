import * as pdfjsLib from "./vendor/pdfjs/pdf.mjs";

if (pdfjsLib?.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "./vendor/pdfjs/pdf.worker.mjs";
}

const SAMPLE_PAGES = [
  { title: "不规则 / 3 (1).jpg", src: "古籍示例/不规则/3%20(1).jpg", sourceType: 2 },
  { title: "不规则 / 3 (1).png", src: "古籍示例/不规则/3%20(1).png", sourceType: 3 },
  { title: "不规则 / 3 (14).png", src: "古籍示例/不规则/3%20(14).png", sourceType: 3 },
  { title: "不规则 / 3 (8).png", src: "古籍示例/不规则/3%20(8).png", sourceType: 3 },
  { title: "不规则 / 试验样例-00000002-00006.jpg", src: "古籍示例/不规则/试验样例-00000002-00006.jpg", sourceType: 2 },
  { title: "不规则 / 试验样例-00000002-00007.jpg", src: "古籍示例/不规则/试验样例-00000002-00007.jpg", sourceType: 2 },
  { title: "不规则 / 试验样例-00000002-00009.jpg", src: "古籍示例/不规则/试验样例-00000002-00009.jpg", sourceType: 2 },
  { title: "不规则 / 试验样例-00000002-00010.jpg", src: "古籍示例/不规则/试验样例-00000002-00010.jpg", sourceType: 2 },
  { title: "图片 / 2 (2).png", src: "古籍示例/图片/2%20(2).png", sourceType: 3 },
  { title: "图片 / 2 (4).png", src: "古籍示例/图片/2%20(4).png", sourceType: 3 },
  { title: "图片 / simple_05.jpg", src: "古籍示例/图片/simple_05.jpg", sourceType: 2 },
  { title: "封面 / 1 (1).png", src: "古籍示例/封面/1%20(1).png", sourceType: 3 },
  { title: "封面 / 1 (2).png", src: "古籍示例/封面/1%20(2).png", sourceType: 3 },
  { title: "封面 / 1 (3).png", src: "古籍示例/封面/1%20(3).png", sourceType: 3 },
  { title: "封面 / 1 (4).png", src: "古籍示例/封面/1%20(4).png", sourceType: 3 },
  { title: "标准样式 / 3 (10).png", src: "古籍示例/标准样式/3%20(10).png", sourceType: 3 },
  { title: "标准样式 / 3 (11).png", src: "古籍示例/标准样式/3%20(11).png", sourceType: 3 },
  { title: "标准样式 / 3 (12).png", src: "古籍示例/标准样式/3%20(12).png", sourceType: 3 },
  { title: "标准样式 / 3 (13).png", src: "古籍示例/标准样式/3%20(13).png", sourceType: 3 },
  { title: "标准样式 / 3 (3).png", src: "古籍示例/标准样式/3%20(3).png", sourceType: 3 },
  { title: "标准样式 / 3 (4).png", src: "古籍示例/标准样式/3%20(4).png", sourceType: 3 },
  { title: "标准样式 / 3 (5).png", src: "古籍示例/标准样式/3%20(5).png", sourceType: 3 },
  { title: "标准样式 / 3 (6).png", src: "古籍示例/标准样式/3%20(6).png", sourceType: 3 },
  { title: "标准样式 / 3 (7).png", src: "古籍示例/标准样式/3%20(7).png", sourceType: 3 },
  { title: "标准样式 / 3 (9).png", src: "古籍示例/标准样式/3%20(9).png", sourceType: 3 },
  { title: "标准样式 / simple_01.jpg", src: "古籍示例/标准样式/simple_01.jpg", sourceType: 2 },
  { title: "标准样式 / simple_03.jpg", src: "古籍示例/标准样式/simple_03.jpg", sourceType: 2 },
  { title: "标准样式 / 试验样例-00000002-00005.jpg", src: "古籍示例/标准样式/试验样例-00000002-00005.jpg", sourceType: 2 },
  { title: "横排 / simple_02.jpg", src: "古籍示例/横排/simple_02.jpg", sourceType: 2 },
  { title: "表格 / 试验样例-00000001-00003.jpg", src: "古籍示例/表格/试验样例-00000001-00003.jpg", sourceType: 2 },
  { title: "顶格 / simple_08.jpg", src: "古籍示例/顶格/simple_08.jpg", sourceType: 2 },
  { title: "顶格 / 试验样例-00000002-00008.jpg", src: "古籍示例/顶格/试验样例-00000002-00008.jpg", sourceType: 2 },
];

const STORAGE_KEY = "guji-editor-state-v1";
const TAB_ITEMS = [
  { id: "editor", label: "图片标注" },
  { id: "glyphs", label: "造字管理" },
  { id: "xml", label: "XML 预览" },
];
const ANNOTATION_TYPES = {
  char: "字",
  sentence: "句",
  paragraph: "段",
  image: "图像",
};
const STYLE_LABELS = {
  box: "画框",
  highlight: "颜色",
  underline: "划线",
};
const NOTE_TYPES = {
  1: "文中注释",
  2: "角注",
  3: "边注",
  4: "批注",
};

const CANVAS_ZOOM_MIN = 0.5;
const CANVAS_ZOOM_MAX = 3;
const CANVAS_ZOOM_STEP = 0.05;
const ANNOTATION_MIN_SIZE_PX = 8;
const UNDERLINE_MIN_LENGTH_PX = 8;
const UNDERLINE_DRAG_TOLERANCE_PX = 5;
const UNDERLINE_MIN_THICKNESS_PX = 2;
const UNDERLINE_COMPONENT_EPSILON = 0.000001;
const OCR_SELECTION_PADDING_RATIO = 0.15;
const OCR_SOURCE_BAIDU_PAGE = "baidu-ocr-page";
const OCR_SOURCE_BAIDU_SELECTION = "baidu-ocr-selection";

const elements = {
  statusSummary: document.getElementById("statusSummary"),
  statusMessage: document.getElementById("statusMessage"),
  tabBar: document.getElementById("tabBar"),
  pageSidebar: document.getElementById("pageSidebar"),
  mainPanel: document.getElementById("mainPanel"),
  inspectorPanel: document.getElementById("inspectorPanel"),
  pageImportInput: document.getElementById("pageImportInput"),
  pdfImportInput: document.getElementById("pdfImportInput"),
  projectImportInput: document.getElementById("projectImportInput"),
  exportXmlButton: document.getElementById("exportXmlButton"),
  exportJsonButton: document.getElementById("exportJsonButton"),
  importJsonButton: document.getElementById("importJsonButton"),
  newProjectButton: document.getElementById("newProjectButton"),
  resetProjectButton: document.getElementById("resetProjectButton"),
};

let state = loadState();
let draftSelection = null;
let draggedPageId = null;
let ocrRequestInFlight = false;

renderAll();
bindGlobalEvents();
showRuntimeHint();

function createDefaultState() {
  const pages = SAMPLE_PAGES.map((page, index) => ({
    id: `page-${index + 1}`,
    title: page.title,
    src: page.src,
    pageNo: index + 1,
    note: "",
    direction: page.title.includes("横排") ? 1 : 0,
    sourceType: page.sourceType,
    width: 0,
    height: 0,
    annotations: [],
  }));

  return {
    meta: {
      articleId: "guji-demo-001",
      type: "1",
      version: "1.0",
      title: "古籍整理课程作业示例",
      subtitle: "在线标注、造字与 XML 导出",
      authors: "山东大学历史文化学院",
      bookName: "古籍整理实验册",
      bookVolume: "第一卷",
      relationNote: "课程作业演示项目",
      publishYear: "AD2026",
      publishDynasty: "当代",
      writingYear: "AD2026",
      writingDynasty: "当代",
      notes: "使用作业提供的样例图片进行字、句、段标注。",
    },
    pages,
    glyphs: [],
    ui: {
      activeTab: "editor",
      currentPageId: pages[0]?.id ?? null,
      currentAnnotationId: null,
      drawType: "char",
      drawStyle: "box",
      editingGlyphId: null,
      canvasZoom: 1,
    },
  };
}

function createEmptyState() {
  return {
    meta: {
      articleId: "",
      type: "1",
      version: "1.0",
      title: "",
      subtitle: "",
      authors: "",
      bookName: "",
      bookVolume: "",
      relationNote: "",
      publishYear: "",
      publishDynasty: "",
      writingYear: "",
      writingDynasty: "",
      notes: "",
    },
    pages: [],
    glyphs: [],
    ui: {
      activeTab: "editor",
      currentPageId: null,
      currentAnnotationId: null,
      drawType: "char",
      drawStyle: "box",
      editingGlyphId: null,
      canvasZoom: 1,
    },
  };
}

function loadState() {
  const fallback = createDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return fallback;
    }
    return normalizeState(JSON.parse(raw), fallback);
  } catch (error) {
    console.warn("load state failed", error);
    return fallback;
  }
}

function normalizeState(raw, fallback = createDefaultState()) {
  const incomingPages = Array.isArray(raw.pages) ? raw.pages : fallback.pages;
  const pages = incomingPages.map((page, index) => ({
    id: page.id || `page-${index + 1}`,
    title: page.title || `第 ${index + 1} 页`,
    src: page.src || "",
    pageNo: Number(page.pageNo) || index + 1,
    note: page.note || "",
    direction: Number(page.direction) === 1 ? 1 : 0,
    sourceType: [1, 2, 3].includes(Number(page.sourceType)) ? Number(page.sourceType) : 2,
    width: Number(page.width) || 0,
    height: Number(page.height) || 0,
    annotations: Array.isArray(page.annotations)
      ? page.annotations.map((annotation, order) => normalizeAnnotation(annotation, order))
      : [],
  }));
  const glyphs = Array.isArray(raw.glyphs)
    ? raw.glyphs.map((glyph, index) => ({
        id: glyph.id || `glyph-${index + 1}`,
        unicode: glyph.unicode || nextPrivateUnicode([]),
        traditional: glyph.traditional || "",
        simplified: glyph.simplified || "",
        description: glyph.description || "",
        imageDataUrl: glyph.imageDataUrl || "",
      }))
    : [];
  const currentPageId = pages.some((page) => page.id === raw?.ui?.currentPageId)
    ? raw.ui.currentPageId
    : pages[0]?.id ?? null;
  const currentPage = pages.find((page) => page.id === currentPageId);
  const currentAnnotationId =
    currentPage && currentPage.annotations.some((annotation) => annotation.id === raw?.ui?.currentAnnotationId)
      ? raw.ui.currentAnnotationId
      : null;

  return {
    meta: {
      ...fallback.meta,
      ...(raw.meta || {}),
    },
    pages,
    glyphs,
    ui: {
      activeTab: TAB_ITEMS.some((item) => item.id === raw?.ui?.activeTab) ? raw.ui.activeTab : "editor",
      currentPageId,
      currentAnnotationId,
      drawType: raw?.ui?.drawType && ANNOTATION_TYPES[raw.ui.drawType] ? raw.ui.drawType : "char",
      drawStyle: raw?.ui?.drawStyle && STYLE_LABELS[raw.ui.drawStyle] ? raw.ui.drawStyle : "box",
      editingGlyphId: glyphs.some((glyph) => glyph.id === raw?.ui?.editingGlyphId) ? raw.ui.editingGlyphId : null,
      canvasZoom: clamp(Number(raw?.ui?.canvasZoom) || 1, CANVAS_ZOOM_MIN, CANVAS_ZOOM_MAX),
    },
  };
}

function normalizeAnnotation(annotation, order) {
  const x = clamp01(Number(annotation.x) || 0);
  const y = clamp01(Number(annotation.y) || 0);
  const width = clamp01(Number(annotation.width) || 0.1);
  const height = clamp01(Number(annotation.height) || 0.1);
  const lineStartX = Number.isFinite(Number(annotation.lineStartX)) ? clamp01(Number(annotation.lineStartX)) : null;
  const lineStartY = Number.isFinite(Number(annotation.lineStartY)) ? clamp01(Number(annotation.lineStartY)) : null;
  const lineEndX = Number.isFinite(Number(annotation.lineEndX)) ? clamp01(Number(annotation.lineEndX)) : null;
  const lineEndY = Number.isFinite(Number(annotation.lineEndY)) ? clamp01(Number(annotation.lineEndY)) : null;
  return {
    id: annotation.id || `annotation-${Date.now()}-${order}`,
    type: ANNOTATION_TYPES[annotation.type] ? annotation.type : "char",
    markStyle: STYLE_LABELS[annotation.markStyle] ? annotation.markStyle : "box",
    color: annotation.color || "#a64032",
    originalText: annotation.originalText || "",
    simplifiedText: annotation.simplifiedText || "",
    note: annotation.note || "",
    noteType: NOTE_TYPES[annotation.noteType] ? annotation.noteType : "1",
    customGlyphId: annotation.customGlyphId || "",
    customCode: annotation.customCode || "",
    lineAngle: normalizeAngle(annotation.lineAngle),
    x,
    y,
    width,
    height,
    lineStartX,
    lineStartY,
    lineEndX,
    lineEndY,
    source: annotation.source || "",
    ocrConfidence: Number.isFinite(Number(annotation.ocrConfidence)) ? Number(annotation.ocrConfidence) : null,
  };
}

function bindGlobalEvents() {
  elements.exportXmlButton.addEventListener("click", () => {
    const xml = buildXml(state);
    downloadFile(`${slugify(state.meta.title || "guji-project")}.xml`, xml, "application/xml;charset=utf-8");
    updateStatus("已导出 XML 文件。");
    renderMainPanel();
  });

  elements.exportJsonButton.addEventListener("click", () => {
    downloadFile(
      `${slugify(state.meta.title || "guji-project")}.json`,
      JSON.stringify(state, null, 2),
      "application/json;charset=utf-8"
    );
    updateStatus("已导出项目 JSON，可用于继续编辑。");
  });

  elements.importJsonButton.addEventListener("click", () => {
    elements.projectImportInput.value = "";
    elements.projectImportInput.click();
  });

  elements.newProjectButton.addEventListener("click", () => {
    if (!window.confirm("新建项目会清空当前内容，是否继续？")) {
      return;
    }
    state = createEmptyState();
    persistState();
    renderAll();
    updateStatus("已新建空白项目。");
  });

  elements.projectImportInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const text = await file.text();
      state = normalizeState(JSON.parse(text));
      persistState();
      renderAll();
      updateStatus(`已导入项目：${file.name}`);
    } catch (error) {
      updateStatus("项目 JSON 导入失败，请确认文件格式正确。", true);
    }
  });

  elements.resetProjectButton.addEventListener("click", () => {
    state = createDefaultState();
    persistState();
    renderAll();
    updateStatus("已恢复到默认样例项目。");
  });

  elements.pageImportInput.addEventListener("change", async (event) => {
    const files = [...(event.target.files || [])];
    if (!files.length) {
      return;
    }
    const importedPages = [];
    for (const file of files) {
      const dataUrl = await readFileAsDataUrl(file);
      importedPages.push({
        id: `page-${crypto.randomUUID()}`,
        title: `本地导入 / ${file.name}`,
        src: dataUrl,
        pageNo: state.pages.length + importedPages.length + 1,
        note: "",
        direction: 0,
        sourceType: 2,
        width: 0,
        height: 0,
        annotations: [],
      });
    }
    state.pages = [...state.pages, ...importedPages];
    state.ui.currentPageId = importedPages[0].id;
    state.ui.currentAnnotationId = null;
    persistState();
    renderAll();
    updateStatus(`已导入 ${importedPages.length} 张本地图片。`);
  });

  elements.pdfImportInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!ensurePdfSupport()) {
      return;
    }
    try {
      const importedPages = await importPdfAsPages(file);
      if (!importedPages.length) {
        updateStatus("PDF 未解析出可导入页面。", true);
        return;
      }
      state.pages = [...state.pages, ...importedPages];
      state.ui.currentPageId = importedPages[0].id;
      state.ui.currentAnnotationId = null;
      persistState();
      renderAll();
      updateStatus(`已导入 PDF：${file.name}，共 ${importedPages.length} 页。`);
    } catch (error) {
      console.error("import pdf failed", error);
      updateStatus("PDF 导入失败，请确认本地 pdf.mjs 和 pdf.worker.mjs 已放到 vendor/pdfjs 目录。", true);
    }
  });

  document.addEventListener("keydown", handleGlobalKeydown);
  window.addEventListener("resize", syncCanvasZoomLayout);
}

function renderAll() {
  renderStatus();
  renderTabs();
  renderSidebar();
  renderMainPanel();
  renderInspector();
}

function renderStatus() {
  const annotationCount = state.pages.reduce((sum, page) => sum + page.annotations.length, 0);
  const charCount = state.glyphs.length;
  elements.statusSummary.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><span>页数</span><strong>${state.pages.length}</strong></div>
      <div class="stat-card"><span>标注</span><strong>${annotationCount}</strong></div>
      <div class="stat-card"><span>造字</span><strong>${charCount}</strong></div>
    </div>
  `;
}

function renderTabs() {
  elements.tabBar.innerHTML = TAB_ITEMS.map(
    (tab) =>
      `<button class="${tab.id === state.ui.activeTab ? "active" : ""}" data-tab="${tab.id}">${tab.label}</button>`
  ).join("");

  elements.tabBar.querySelectorAll("button[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.activeTab = button.dataset.tab;
      persistState();
      renderAll();
    });
  });
}

function renderSidebar() {
  const currentPage = getCurrentPage();
  elements.pageSidebar.innerHTML = `
    <div class="sidebar-card">
      <div class="section-title">
        <h2>页面列表</h2>
      </div>
      ${
        currentPage
          ? `
            <div class="page-preview">
              <div class="page-preview-frame">
                <img src="${currentPage.src}" alt="${escapeAttribute(currentPage.title)}" />
              </div>
              <div class="page-preview-meta">
                <strong>当前预览: 第 ${currentPage.pageNo} 页</strong>
                <div>${escapeHtml(currentPage.title)}</div>
              </div>
            </div>
          `
          : `
            <div class="page-preview empty-state">当前还没有页面可预览。</div>
          `
      }
      <div class="page-list">
        ${state.pages
          .map((page) => {
            const active = currentPage?.id === page.id ? "active" : "";
            return `
              <div class="page-item ${active}" data-page-id="${page.id}" draggable="true">
                <strong>第 ${page.pageNo} 页</strong>
                <div>${escapeHtml(page.title)}</div>
                ${
                  page.src
                    ? `
                      <div class="page-item-preview">
                        <img src="${page.src}" alt="${escapeAttribute(page.title)}" loading="lazy" />
                      </div>
                    `
                    : ""
                }
                <div class="mini-note">标注 ${page.annotations.length} 条 · 来源类型 ${page.sourceType}</div>
              </div>
            `;
          })
          .join("")}
      </div>
      <div class="page-actions">
        <button id="addPageButton">导入本地图片</button>
      </div>
    </div>
    <div class="sidebar-card">
      <div class="section-title">
        <h3>当前页提示</h3>
      </div>
      <div class="hint-box">
        在中间画布中拖拽即可新增标注。当前预设为
        <strong>${ANNOTATION_TYPES[state.ui.drawType]}</strong> +
        <strong>${STYLE_LABELS[state.ui.drawStyle]}</strong>。
      </div>
    </div>
  `;

  elements.pageSidebar.querySelectorAll("[data-page-id]").forEach((item) => {
    item.addEventListener("click", () => {
      state.ui.currentPageId = item.dataset.pageId;
      state.ui.currentAnnotationId = null;
      persistState();
      renderAll();
    });

    item.addEventListener("dragstart", (event) => {
      draggedPageId = item.dataset.pageId;
      item.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggedPageId);
    });

    item.addEventListener("dragend", () => {
      draggedPageId = null;
      item.classList.remove("dragging");
      clearPageDragState();
    });

    item.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (!draggedPageId || draggedPageId === item.dataset.pageId) {
        return;
      }
      item.classList.add("drag-over");
      event.dataTransfer.dropEffect = "move";
    });

    item.addEventListener("dragleave", () => {
      item.classList.remove("drag-over");
    });

    item.addEventListener("drop", (event) => {
      event.preventDefault();
      const targetPageId = item.dataset.pageId;
      item.classList.remove("drag-over");
      if (!draggedPageId || draggedPageId === targetPageId) {
        return;
      }
      reorderPages(draggedPageId, targetPageId);
    });
  });

  document.getElementById("addPageButton")?.addEventListener("click", () => {
    elements.pageImportInput.value = "";
    elements.pageImportInput.click();
  });

  const pageActions = elements.pageSidebar.querySelector(".page-actions");
  if (pageActions && !document.getElementById("importPdfButton")) {
    const importPdfButton = document.createElement("button");
    importPdfButton.id = "importPdfButton";
    importPdfButton.textContent = "导入 PDF";
    pageActions.appendChild(importPdfButton);
    importPdfButton.addEventListener("click", () => {
      if (!ensurePdfSupport()) {
        return;
      }
      elements.pdfImportInput.value = "";
      elements.pdfImportInput.click();
    });
  }

}

function clearPageDragState() {
  elements.pageSidebar.querySelectorAll(".page-item").forEach((item) => {
    item.classList.remove("dragging", "drag-over");
  });
}

function reorderPages(sourcePageId, targetPageId) {
  const sourceIndex = state.pages.findIndex((page) => page.id === sourcePageId);
  const targetIndex = state.pages.findIndex((page) => page.id === targetPageId);
  if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex) {
    return;
  }

  const nextPages = [...state.pages];
  const [movedPage] = nextPages.splice(sourceIndex, 1);
  nextPages.splice(targetIndex, 0, movedPage);
  state.pages = nextPages.map((page, index) => ({ ...page, pageNo: index + 1 }));
  persistState();
  renderAll();
  updateStatus(`已将“${movedPage.title}”移动到第 ${targetIndex + 1} 页。`);
}

function renderMainPanel() {
  if (state.ui.activeTab === "glyphs") {
    renderGlyphPanel();
    return;
  }
  if (state.ui.activeTab === "xml") {
    renderXmlPanel();
    return;
  }
  renderEditorPanel();
}

function renderEditorPanel() {
  const currentPage = getCurrentPage();
  if (!currentPage) {
    elements.mainPanel.innerHTML = `<div class="main-card"><div class="empty-state">当前没有可编辑页面。</div></div>`;
    return;
  }
  const zoomPercent = Math.round(getCanvasZoom() * 100);

  elements.mainPanel.innerHTML = `
    <div class="main-card page-canvas-shell">
      <div class="tool-panel">
        <div class="tool-group">
          <span>标注类型</span>
          ${Object.entries(ANNOTATION_TYPES)
            .map(
              ([key, label]) =>
                `<button class="${state.ui.drawType === key ? "active" : ""}" data-draw-type="${key}">${label}</button>`
            )
            .join("")}
        </div>
        <div class="tool-group">
          <span>标记方式</span>
          ${Object.entries(STYLE_LABELS)
            .map(
              ([key, label]) =>
                `<button class="${state.ui.drawStyle === key ? "active" : ""}" data-draw-style="${key}">${label}</button>`
            )
            .join("")}
        </div>
        <div class="tool-group">
          <span>OCR</span>
          <button type="button" id="runOcrButton" class="ghost">Page OCR</button>
          <button type="button" id="clearOcrButton" class="ghost">Clear OCR</button>
        </div>
      </div>
      <div class="canvas-workbench">
        <div class="canvas-wrap" id="canvasWrap">
          <div class="canvas-viewport" id="canvasViewport">
            <div class="canvas-stage" id="canvasStage">
              <img id="pageImage" src="${currentPage.src}" alt="${escapeHtml(currentPage.title)}" />
              <div class="annotation-layer" id="annotationLayer">
                ${currentPage.annotations.map((annotation) => renderAnnotationBox(annotation, currentPage)).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="zoom-rail zoom-rail-horizontal">
        <span class="zoom-caption">缩放尺</span>
        <button type="button" class="zoom-nudge" data-zoom-delta="-0.1">-</button>
        <input
          id="zoomSliderHorizontal"
          class="zoom-slider"
          type="range"
          min="${Math.round(CANVAS_ZOOM_MIN * 100)}"
          max="${Math.round(CANVAS_ZOOM_MAX * 100)}"
          step="${Math.round(CANVAS_ZOOM_STEP * 100)}"
          value="${zoomPercent}"
        />
        <button type="button" class="zoom-nudge" data-zoom-delta="0.1">+</button>
        <strong class="zoom-value" id="zoomValue">${zoomPercent}%</strong>
        <button type="button" id="zoomResetButton" class="ghost">100%</button>
      </div>
      <div class="annotation-list">
        ${
          currentPage.annotations.length
            ? currentPage.annotations
                .map((annotation, index) => {
                  const active = annotation.id === state.ui.currentAnnotationId ? "active" : "";
                  const glyph = annotation.customGlyphId
                    ? state.glyphs.find((item) => item.id === annotation.customGlyphId)
                    : null;
                  return `
                    <div class="annotation-row ${active}" data-annotation-id="${annotation.id}">
                      <strong>${index + 1}. ${ANNOTATION_TYPES[annotation.type]} · ${STYLE_LABELS[annotation.markStyle]}</strong>
                      <div>${escapeHtml(annotation.originalText || "未填写原文")}</div>
                      <div class="mini-note">
                        简体：${escapeHtml(annotation.simplifiedText || "未填写")}
                        ${glyph ? ` · 造字：${escapeHtml(glyph.unicode)}` : ""}
                      </div>
                    </div>
                  `;
                })
                .join("")
            : `<div class="empty-state">当前页还没有标注。请在图像上拖拽框选字、句或段。</div>`
        }
      </div>
    </div>
  `;

  elements.mainPanel.querySelectorAll("[data-draw-type]").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.drawType = button.dataset.drawType;
      persistState();
      renderMainPanel();
      renderSidebar();
    });
  });

  elements.mainPanel.querySelectorAll("[data-draw-style]").forEach((button) => {
    button.addEventListener("click", () => {
      state.ui.drawStyle = button.dataset.drawStyle;
      persistState();
      renderMainPanel();
      renderSidebar();
    });
  });

  document.getElementById("runOcrButton")?.addEventListener("click", () => {
    runOcrForCurrentPage();
  });

  document.getElementById("clearOcrButton")?.addEventListener("click", () => {
    clearOcrAnnotationsForCurrentPage();
  });

  elements.mainPanel.querySelectorAll("[data-annotation-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.ui.currentAnnotationId = row.dataset.annotationId;
      persistState();
      renderMainPanel();
      renderInspector();
    });
  });

  bindCanvasZoomControls();
  bindCanvasPanControls();
  syncCanvasZoomControls();

  const pageImage = document.getElementById("pageImage");
  pageImage.addEventListener("load", () => {
    updatePageDimensions(pageImage.naturalWidth, pageImage.naturalHeight);
    syncCanvasZoomLayout();
    setupDrawing();
  });
  if (pageImage.complete) {
    updatePageDimensions(pageImage.naturalWidth, pageImage.naturalHeight);
    syncCanvasZoomLayout();
    setupDrawing();
  }
}

function bindCanvasZoomControls() {
  const horizontalSlider = document.getElementById("zoomSliderHorizontal");
  const sliders = [horizontalSlider].filter(Boolean);

  sliders.forEach((slider) => {
    slider.addEventListener("input", (event) => {
      setCanvasZoom(Number(event.target.value) / 100, { persist: false });
    });
    slider.addEventListener("change", () => {
      persistState();
    });
  });

  document.querySelectorAll("[data-zoom-delta]").forEach((button) => {
    button.addEventListener("click", () => {
      const delta = Number(button.dataset.zoomDelta) || 0;
      setCanvasZoom(getCanvasZoom() + delta);
    });
  });

  document.getElementById("zoomResetButton")?.addEventListener("click", () => {
    setCanvasZoom(1);
  });
}

function getCanvasZoom() {
  return clamp(Number(state.ui.canvasZoom) || 1, CANVAS_ZOOM_MIN, CANVAS_ZOOM_MAX);
}

function setCanvasZoom(value, { persist = true } = {}) {
  const nextZoom = clamp(Number(value) || 1, CANVAS_ZOOM_MIN, CANVAS_ZOOM_MAX);
  state.ui.canvasZoom = round(nextZoom);
  if (persist) {
    persistState();
  }
  syncCanvasZoomControls();
  syncCanvasZoomLayout();
}

function syncCanvasZoomControls() {
  const zoomPercent = Math.round(getCanvasZoom() * 100);
  document.getElementById("zoomSliderHorizontal")?.setAttribute("value", String(zoomPercent));

  const horizontalSlider = document.getElementById("zoomSliderHorizontal");
  if (horizontalSlider) {
    horizontalSlider.value = String(zoomPercent);
  }
  const zoomValue = document.getElementById("zoomValue");
  if (zoomValue) {
    zoomValue.textContent = `${zoomPercent}%`;
  }
}

function syncCanvasZoomLayout() {
  const stage = document.getElementById("canvasStage");
  const viewport = document.getElementById("canvasViewport");
  const canvasWrap = document.getElementById("canvasWrap");
  const pageImage = document.getElementById("pageImage");
  if (!stage || !viewport || !canvasWrap || !pageImage?.naturalWidth || !pageImage?.naturalHeight) {
    return;
  }
  const zoom = getCanvasZoom();
  const { width: baseWidth, height: baseHeight, innerWidth, innerHeight } = getCanvasBaseSize(pageImage, canvasWrap);
  const viewportWidth = Math.max(1, Math.round(baseWidth * zoom));
  const viewportHeight = Math.max(1, Math.round(baseHeight * zoom));
  stage.style.width = `${baseWidth}px`;
  stage.style.height = `${baseHeight}px`;
  stage.style.transform = `scale(${zoom})`;
  stage.style.transformOrigin = "top left";
  viewport.style.width = `${viewportWidth}px`;
  viewport.style.height = `${viewportHeight}px`;

  const maxScrollLeft = Math.max(0, viewportWidth - innerWidth);
  const maxScrollTop = Math.max(0, viewportHeight - innerHeight);
  if (zoom <= 1) {
    canvasWrap.scrollLeft = 0;
    canvasWrap.scrollTop = 0;
    return;
  }
  canvasWrap.scrollLeft = clamp(canvasWrap.scrollLeft, 0, maxScrollLeft);
  canvasWrap.scrollTop = clamp(canvasWrap.scrollTop, 0, maxScrollTop);
}

function getCanvasBaseSize(pageImage, canvasWrap) {
  const wrapStyle = window.getComputedStyle(canvasWrap);
  const paddingX = Number.parseFloat(wrapStyle.paddingLeft || "0") + Number.parseFloat(wrapStyle.paddingRight || "0");
  const paddingY = Number.parseFloat(wrapStyle.paddingTop || "0") + Number.parseFloat(wrapStyle.paddingBottom || "0");
  const innerWidth = Math.max(1, Math.floor(canvasWrap.clientWidth - paddingX));
  const innerHeight = Math.max(1, Math.floor(canvasWrap.clientHeight - paddingY));
  const naturalWidth = pageImage.naturalWidth;
  const naturalHeight = pageImage.naturalHeight;
  const fittedWidth = Math.min(naturalWidth, 980, innerWidth);
  const scale = fittedWidth / Math.max(1, naturalWidth);
  return {
    width: Math.max(1, Math.round(fittedWidth)),
    height: Math.max(1, Math.round(naturalHeight * scale)),
    innerWidth,
    innerHeight,
  };
}

function bindCanvasPanControls() {
  const canvasWrap = document.getElementById("canvasWrap");
  if (!canvasWrap) {
    return;
  }

  let isPanning = false;
  let pointerId = null;
  let startClientX = 0;
  let startClientY = 0;
  let startScrollLeft = 0;
  let startScrollTop = 0;

  const endPan = () => {
    isPanning = false;
    pointerId = null;
    canvasWrap.classList.remove("is-panning");
  };

  canvasWrap.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  canvasWrap.addEventListener("pointerdown", (event) => {
    if (event.button !== 2) {
      return;
    }
    isPanning = true;
    pointerId = event.pointerId;
    startClientX = event.clientX;
    startClientY = event.clientY;
    startScrollLeft = canvasWrap.scrollLeft;
    startScrollTop = canvasWrap.scrollTop;
    canvasWrap.classList.add("is-panning");
    canvasWrap.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  canvasWrap.addEventListener("pointermove", (event) => {
    if (!isPanning || event.pointerId !== pointerId) {
      return;
    }
    const deltaX = event.clientX - startClientX;
    const deltaY = event.clientY - startClientY;
    canvasWrap.scrollLeft = startScrollLeft - deltaX;
    canvasWrap.scrollTop = startScrollTop - deltaY;
    event.preventDefault();
  });

  canvasWrap.addEventListener("pointerup", (event) => {
    if (event.pointerId !== pointerId) {
      return;
    }
    canvasWrap.releasePointerCapture?.(event.pointerId);
    endPan();
  });

  canvasWrap.addEventListener("pointercancel", (event) => {
    if (event.pointerId !== pointerId) {
      return;
    }
    endPan();
  });

  canvasWrap.addEventListener("lostpointercapture", () => {
    endPan();
  });
}

function renderGlyphPanel() {
  const editingGlyph = getEditingGlyph();
  elements.mainPanel.innerHTML = `
    <div class="main-card">
      <div class="section-title">
        <h2>造字库</h2>
        <span class="section-meta">为无简体对应字建立 Unicode 与字样关系</span>
      </div>
      <div class="glyph-grid">
        ${
          state.glyphs.length
            ? state.glyphs.map((glyph) => renderGlyphCard(glyph)).join("")
            : `<div class="empty-state">还没有造字记录。右侧表单可以新增一个私用区编码字。</div>`
        }
      </div>
    </div>
    <div class="main-card">
      <div class="section-title">
        <h2>${editingGlyph ? "编辑造字" : "新增造字"}</h2>
        <span class="section-meta">默认使用 Unicode 私用区编码</span>
      </div>
      <form id="glyphForm">
        <div class="field-grid">
          <div class="field-block">
            <label for="glyphUnicode">Unicode 编码</label>
            <input id="glyphUnicode" name="unicode" value="${escapeAttribute(editingGlyph?.unicode || nextPrivateUnicode(state.glyphs))}" />
          </div>
          <div class="field-block">
            <label for="glyphTraditional">字形/原字</label>
            <input id="glyphTraditional" name="traditional" value="${escapeAttribute(editingGlyph?.traditional || "")}" placeholder="如：𠂤" />
          </div>
          <div class="field-block">
            <label for="glyphSimplified">简体对应</label>
            <input id="glyphSimplified" name="simplified" value="${escapeAttribute(editingGlyph?.simplified || "")}" placeholder="如：无、某" />
          </div>
          <div class="field-block">
            <label for="glyphImage">字样图片</label>
            <input id="glyphImage" type="file" accept="image/*" />
          </div>
          <div class="field-block full">
            <label for="glyphDescription">说明</label>
            <textarea id="glyphDescription" name="description" placeholder="记录这个字的来源、释义或录入说明。">${escapeHtml(editingGlyph?.description || "")}</textarea>
          </div>
        </div>
        <div id="glyphImagePreview" class="mini-note">${
          editingGlyph?.imageDataUrl
            ? `<img src="${editingGlyph.imageDataUrl}" alt="字样预览" style="max-width:180px;max-height:140px;border-radius:12px;border:1px solid var(--line);margin-top:10px;background:#f8f1e5;padding:6px;" />`
            : "可上传一个字样图片，建立编码与字形的对应关系。"
        }</div>
        <div class="inline-actions" style="margin-top: 14px;">
          <button type="submit" class="primary">${editingGlyph ? "保存造字" : "新增造字"}</button>
          <button type="button" id="clearGlyphFormButton">清空表单</button>
          ${editingGlyph ? `<button type="button" id="deleteGlyphButton" class="danger">删除造字</button>` : ""}
        </div>
      </form>
    </div>
  `;

  elements.mainPanel.querySelectorAll("[data-glyph-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.ui.editingGlyphId = card.dataset.glyphId;
      persistState();
      renderMainPanel();
      renderInspector();
    });
  });

  document.getElementById("glyphForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const unicode = form.querySelector("#glyphUnicode").value.trim().toUpperCase();
    const traditional = form.querySelector("#glyphTraditional").value.trim();
    const simplified = form.querySelector("#glyphSimplified").value.trim();
    const description = form.querySelector("#glyphDescription").value.trim();
    const imageFile = form.querySelector("#glyphImage").files?.[0];
    const imageDataUrl = imageFile ? await readFileAsDataUrl(imageFile) : editingGlyph?.imageDataUrl || "";
    const glyph = {
      id: editingGlyph?.id || `glyph-${crypto.randomUUID()}`,
      unicode: unicode || nextPrivateUnicode(state.glyphs),
      traditional,
      simplified,
      description,
      imageDataUrl,
    };

    state.glyphs = upsertById(state.glyphs, glyph);
    state.ui.editingGlyphId = glyph.id;
    persistState();
    renderAll();
    updateStatus(`已保存造字 ${glyph.unicode}。`);
  });

  document.getElementById("clearGlyphFormButton")?.addEventListener("click", () => {
    state.ui.editingGlyphId = null;
    persistState();
    renderAll();
  });

  document.getElementById("deleteGlyphButton")?.addEventListener("click", () => {
    if (!editingGlyph) {
      return;
    }
    state.glyphs = state.glyphs.filter((glyph) => glyph.id !== editingGlyph.id);
    state.pages = state.pages.map((page) => ({
      ...page,
      annotations: page.annotations.map((annotation) =>
        annotation.customGlyphId === editingGlyph.id ? { ...annotation, customGlyphId: "" } : annotation
      ),
    }));
    state.ui.editingGlyphId = null;
    persistState();
    renderAll();
    updateStatus("已删除造字记录。");
  });
}

function renderXmlPanel() {
  const xml = buildXml(state);
  elements.mainPanel.innerHTML = `
    <div class="main-card">
      <div class="section-title">
        <h2>XML 预览</h2>
        <span class="section-meta">结构对齐 article / head / content / view / sources</span>
      </div>
      <div class="inline-actions" style="margin-bottom: 14px;">
        <button id="copyXmlButton">复制 XML</button>
        <button id="refreshXmlButton" class="ghost">刷新预览</button>
      </div>
      <div class="xml-preview" id="xmlPreview">${escapeHtml(xml)}</div>
    </div>
  `;

  document.getElementById("copyXmlButton")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(xml);
      updateStatus("XML 已复制到剪贴板。");
    } catch (error) {
      updateStatus("复制失败，可以直接使用导出 XML 按钮。", true);
    }
  });

  document.getElementById("refreshXmlButton")?.addEventListener("click", () => {
    renderMainPanel();
    updateStatus("XML 预览已刷新。");
  });
}

function renderInspector() {
  if (state.ui.activeTab === "glyphs") {
    renderGlyphInspector();
    return;
  }
  if (state.ui.activeTab === "xml") {
    renderXmlInspector();
    return;
  }
  renderEditorInspector();
}

function renderEditorInspector() {
  const currentPage = getCurrentPage();
  const annotation = getCurrentAnnotation();
  const metaPlaceholders = {
    articleId: "编号",
    title: "标题",
    subtitle: "副标题",
    authors: "作者",
    bookName: "书名",
    bookVolume: "卷册",
    publishYear: "出版时间",
    writingYear: "写作时间",
    publishDynasty: "朝代",
    writingDynasty: "朝代",
    relationNote: "关系说明",
    notes: "项目说明",
  };
  elements.inspectorPanel.innerHTML = `
    <div class="inspector-card">
      <div class="section-title">
        <h2>标注属性</h2>
      </div>
      ${
        annotation
          ? renderAnnotationForm(annotation)
          : `<div class="empty-state">先在中间页面上拖拽选中一个区域，再录入原文、简体字、注释和编码信息。</div>`
      }
    </div>
    <div class="inspector-card">
      <div class="section-title">
        <h2>当前页面</h2>
        <span class="section-meta">第 ${currentPage?.pageNo ?? "-"} 页</span>
      </div>
      ${
        currentPage
          ? `
            <form id="pageForm">
              <div class="field-grid">
                <div class="field-block full">
                  <label for="pageTitle">标题</label>
                  <input id="pageTitle" name="title" value="${escapeAttribute(currentPage.title)}" />
                </div>
                <div class="field-block">
                  <label for="pageSourceType">source.type</label>
                  <select id="pageSourceType" name="sourceType">
                    <option value="1" ${currentPage.sourceType === 1 ? "selected" : ""}>1 原书扫描</option>
                    <option value="2" ${currentPage.sourceType === 2 ? "selected" : ""}>2 高分辨率照片</option>
                    <option value="3" ${currentPage.sourceType === 3 ? "selected" : ""}>3 低分辨率照片</option>
                  </select>
                </div>
                <div class="field-block">
                  <label for="pageDirection">direction</label>
                  <select id="pageDirection" name="direction">
                    <option value="0" ${currentPage.direction === 0 ? "selected" : ""}>0 竖排</option>
                    <option value="1" ${currentPage.direction === 1 ? "selected" : ""}>1 横排</option>
                  </select>
                </div>
                <div class="field-block full">
                  <label for="pageNote">页面注释</label>
                  <textarea id="pageNote" name="note">${escapeHtml(currentPage.note)}</textarea>
                </div>
              </div>
            </form>
            <div class="inline-actions" style="margin-top: 12px;">
              <button id="removeCurrentPageButton" class="danger">删除当前页</button>
            </div>
          `
          : `<div class="empty-state">暂无页面。</div>`
      }
    </div>
    <div class="inspector-card">
      <div class="section-title">
        <h2>项目元数据</h2>
      </div>
      <form id="metaForm">
        <div class="field-grid">
          <div class="field-block">
            <label for="metaArticleId">article id</label>
            <input id="metaArticleId" name="articleId" value="${escapeAttribute(state.meta.articleId)}" placeholder="${metaPlaceholders.articleId}" />
          </div>
          <div class="field-block">
            <label for="metaTitle">title</label>
            <input id="metaTitle" name="title" value="${escapeAttribute(state.meta.title)}" placeholder="${metaPlaceholders.title}" />
          </div>
          <div class="field-block">
            <label for="metaSubtitle">subtitle</label>
            <input id="metaSubtitle" name="subtitle" value="${escapeAttribute(state.meta.subtitle)}" placeholder="${metaPlaceholders.subtitle}" />
          </div>
          <div class="field-block">
            <label for="metaAuthors">authors</label>
            <input id="metaAuthors" name="authors" value="${escapeAttribute(state.meta.authors)}" placeholder="${metaPlaceholders.authors}" />
          </div>
          <div class="field-block">
            <label for="metaBookName">book.name</label>
            <input id="metaBookName" name="bookName" value="${escapeAttribute(state.meta.bookName)}" placeholder="${metaPlaceholders.bookName}" />
          </div>
          <div class="field-block">
            <label for="metaBookVolume">book.volume</label>
            <input id="metaBookVolume" name="bookVolume" value="${escapeAttribute(state.meta.bookVolume)}" placeholder="${metaPlaceholders.bookVolume}" />
          </div>
          <div class="field-block">
            <label for="metaPublishYear">publish_date.year</label>
            <input id="metaPublishYear" name="publishYear" value="${escapeAttribute(state.meta.publishYear)}" placeholder="${metaPlaceholders.publishYear}" />
          </div>
          <div class="field-block">
            <label for="metaWritingYear">writing_date.year</label>
            <input id="metaWritingYear" name="writingYear" value="${escapeAttribute(state.meta.writingYear)}" placeholder="${metaPlaceholders.writingYear}" />
          </div>
          <div class="field-block">
            <label for="metaPublishDynasty">publish_date.dynasty</label>
            <input id="metaPublishDynasty" name="publishDynasty" value="${escapeAttribute(state.meta.publishDynasty)}" placeholder="${metaPlaceholders.publishDynasty}" />
          </div>
          <div class="field-block">
            <label for="metaWritingDynasty">writing_date.dynasty</label>
            <input id="metaWritingDynasty" name="writingDynasty" value="${escapeAttribute(state.meta.writingDynasty)}" placeholder="${metaPlaceholders.writingDynasty}" />
          </div>
          <div class="field-block full">
            <label for="metaRelationNote">relation.note</label>
            <input id="metaRelationNote" name="relationNote" value="${escapeAttribute(state.meta.relationNote)}" placeholder="${metaPlaceholders.relationNote}" />
          </div>
          <div class="field-block full">
            <label for="metaNotes">项目说明</label>
            <textarea id="metaNotes" name="notes" placeholder="${metaPlaceholders.notes}">${escapeHtml(state.meta.notes)}</textarea>
          </div>
        </div>
      </form>
    </div>
  `;

  document.getElementById("metaForm")?.addEventListener("input", handleMetaInput);
  document.getElementById("pageForm")?.addEventListener("input", handlePageInput);
  document.getElementById("removeCurrentPageButton")?.addEventListener("click", removeCurrentPage);

  const annotationForm = document.getElementById("annotationForm");
  if (annotationForm) {
    annotationForm.addEventListener("input", handleAnnotationInput);
    document.getElementById("recognizeAnnotationButton")?.addEventListener("click", () => {
      runOcrForCurrentAnnotation();
    });
    document.getElementById("lookupDictionaryButton")?.addEventListener("click", lookupAncientDictionaryForCurrentAnnotation);
    document.getElementById("generateGlyphButton")?.addEventListener("click", createGlyphFromCurrentAnnotation);
    document.getElementById("duplicateAnnotationButton")?.addEventListener("click", duplicateCurrentAnnotation);
    document.getElementById("deleteAnnotationButton")?.addEventListener("click", deleteCurrentAnnotation);
  }
}

function renderGlyphInspector() {
  const editingGlyph = getEditingGlyph();
  elements.inspectorPanel.innerHTML = `
    <div class="inspector-card">
      <div class="section-title">
        <h2>造字说明</h2>
        <span class="section-meta">课程扩展功能</span>
      </div>
      <div class="hint-box">
        对于没有简体字对应的古汉字，可以在这里分配 Unicode 私用区编码，例如 <strong>E000</strong>、
        <strong>E001</strong>，并上传字样图片建立映射关系。
      </div>
    </div>
    <div class="inspector-card">
      <div class="section-title">
        <h2>当前记录</h2>
      </div>
      ${
        editingGlyph
          ? `
            <div class="mini-note">编码：${escapeHtml(editingGlyph.unicode)}</div>
            <div class="mini-note">原字：${escapeHtml(editingGlyph.traditional || "未填写")}</div>
            <div class="mini-note">简体：${escapeHtml(editingGlyph.simplified || "未填写")}</div>
            <div class="mini-note">说明：${escapeHtml(editingGlyph.description || "未填写")}</div>
          `
          : `<div class="empty-state">右侧表单还未选中造字记录。</div>`
      }
    </div>
    <div class="inspector-card">
      <div class="section-title">
        <h2>可关联到标注</h2>
      </div>
      <div class="mini-note">
        回到“图片标注”页后，在标注属性里选择造字编码，就可以把这个特殊字关联到具体字块。
      </div>
    </div>
  `;
}

function renderXmlInspector() {
  elements.inspectorPanel.innerHTML = `
    <div class="inspector-card">
      <div class="section-title">
        <h2>导出说明</h2>
        <span class="section-meta">对应作业要求</span>
      </div>
      <div class="hint-box">
        导出的 XML 包含 <strong>article</strong>、<strong>head</strong>、<strong>content</strong>、
        <strong>view</strong>、<strong>sources</strong> 五个主体结构，并附带 <strong>custom_chars</strong>
        保存造字信息。
      </div>
    </div>
    <div class="inspector-card">
      <div class="section-title">
        <h2>结构摘要</h2>
      </div>
      <div class="mini-note">content.page: ${state.pages.length} 页</div>
      <div class="mini-note">sources.source: ${state.pages.length} 条</div>
      <div class="mini-note">custom_chars.glyph: ${state.glyphs.length} 条</div>
      <div class="mini-note">annotations: ${state.pages.reduce((sum, page) => sum + page.annotations.length, 0)} 条</div>
    </div>
  `;
}

function renderAnnotationForm(annotation) {
  const primaryLabel = annotation.type === "image" ? "图像名称/说明" : "原文录入";
  const primaryPlaceholder = annotation.type === "image" ? "输入图像区域名称或说明" : "输入古籍原字或原句";
  return `
    <form id="annotationForm">
      <div class="field-grid">
        <div class="field-block">
          <label for="annotationType">类型</label>
          <select id="annotationType" name="type">
            ${Object.entries(ANNOTATION_TYPES)
              .map(([key, label]) => `<option value="${key}" ${annotation.type === key ? "selected" : ""}>${label}</option>`)
              .join("")}
          </select>
        </div>
        <div class="field-block">
          <label for="annotationStyle">标记方式</label>
          <select id="annotationStyle" name="markStyle">
            ${Object.entries(STYLE_LABELS)
              .map(
                ([key, label]) => `<option value="${key}" ${annotation.markStyle === key ? "selected" : ""}>${label}</option>`
              )
              .join("")}
          </select>
        </div>
        <div class="field-block">
          <label for="annotationColor">颜色</label>
          <input id="annotationColor" type="color" name="color" value="${escapeAttribute(annotation.color)}" />
        </div>
        ${
          annotation.markStyle === "underline"
            ? `
              <div class="field-block">
                <label for="annotationLineAngle">划线方向 (0-360°)</label>
                <input id="annotationLineAngle" name="lineAngle" type="number" min="0" max="360" step="1" value="${round(annotation.lineAngle)}" />
              </div>
            `
            : ""
        }
        ${
          annotation.type === "image"
            ? ""
            : `
              <div class="field-block">
                <label for="annotationNoteType">注释类型</label>
                <select id="annotationNoteType" name="noteType">
                  ${Object.entries(NOTE_TYPES)
                    .map(([key, label]) => `<option value="${key}" ${annotation.noteType === key ? "selected" : ""}>${label}</option>`)
                    .join("")}
                </select>
              </div>
            `
        }
        <div class="field-block full">
          <label for="annotationOriginal">${primaryLabel}</label>
          <input id="annotationOriginal" name="originalText" value="${escapeAttribute(annotation.originalText)}" placeholder="${primaryPlaceholder}" />
        </div>
        ${
          annotation.type === "image"
            ? ""
            : `
              <div class="field-block full">
                <label>&nbsp;</label>
                <button id="recognizeAnnotationButton" type="button">OCR Fill Original</button>
              </div>
            `
        }
        ${
          annotation.type === "image"
            ? ""
            : `
              <div class="field-block full">
                <label for="annotationSimplified">简体录入</label>
                <input id="annotationSimplified" name="simplifiedText" value="${escapeAttribute(annotation.simplifiedText)}" placeholder="输入对应的简体内容" />
              </div>
            `
        }
        ${
          annotation.type === "image"
            ? ""
            : `
              <div class="field-block">
                <label for="annotationGlyph">造字关联</label>
                <select id="annotationGlyph" name="customGlyphId">
                  <option value="">不使用</option>
                  ${state.glyphs
                    .map(
                      (glyph) =>
                        `<option value="${glyph.id}" ${annotation.customGlyphId === glyph.id ? "selected" : ""}>${escapeHtml(
                          `${glyph.unicode} ${glyph.traditional || glyph.simplified || ""}`
                        )}</option>`
                    )
                    .join("")}
                </select>
              </div>
            `
        }
        ${
          annotation.type !== "char"
            ? ""
            : `
              <div class="field-block">
                <label>&nbsp;</label>
                <button id="lookupDictionaryButton" type="button">\u67e5\u8be2\u53e4\u6c49\u8bed\u8bcd\u5178</button>
              </div>
              <div class="field-block">
                <label>&nbsp;</label>
                <button id="generateGlyphButton" type="button">一键造字</button>
              </div>
            `
        }
        ${
          annotation.type === "image"
            ? ""
            : `
              <div class="field-block">
                <label for="annotationCustomCode">自定义编码</label>
                <input id="annotationCustomCode" name="customCode" value="${escapeAttribute(annotation.customCode)}" placeholder="如 E000" />
              </div>
            `
        }
        <div class="field-block">
          <label for="annotationX">起始 X (%)</label>
          <input id="annotationX" name="x" type="number" min="0" max="100" step="0.1" value="${round(annotation.x * 100)}" />
        </div>
        <div class="field-block">
          <label for="annotationY">起始 Y (%)</label>
          <input id="annotationY" name="y" type="number" min="0" max="100" step="0.1" value="${round(annotation.y * 100)}" />
        </div>
        <div class="field-block">
          <label for="annotationWidth">宽度 (%)</label>
          <input id="annotationWidth" name="width" type="number" min="0.5" max="100" step="0.1" value="${round(annotation.width * 100)}" />
        </div>
        <div class="field-block">
          <label for="annotationHeight">高度 (%)</label>
          <input id="annotationHeight" name="height" type="number" min="0.5" max="100" step="0.1" value="${round(annotation.height * 100)}" />
        </div>
        <div class="field-block full">
          <label for="annotationNote">注释内容</label>
          <textarea id="annotationNote" name="note" placeholder="例如释文、校勘说明、批注等">${escapeHtml(annotation.note)}</textarea>
        </div>
      </div>
    </form>
    <div class="inline-actions" style="margin-top: 12px;">
      <button id="duplicateAnnotationButton">复制标注</button>
      <button id="deleteAnnotationButton" class="danger">删除标注</button>
    </div>
  `;
}

function handleMetaInput(event) {
  state.meta[event.target.name] = event.target.value;
  persistState();
  renderStatus();
}

function handlePageInput(event) {
  const currentPage = getCurrentPage();
  if (!currentPage) {
    return;
  }
  const value = event.target.name === "sourceType" || event.target.name === "direction" ? Number(event.target.value) : event.target.value;
  updateCurrentPage(
    { [event.target.name]: value },
    {
      renderSidebar: ["title", "sourceType"].includes(event.target.name),
      renderMainPanel: false,
      renderInspector: false,
    }
  );
}

function handleAnnotationInput(event) {
  const annotation = getCurrentAnnotation();
  const currentPage = getCurrentPage();
  if (!annotation) {
    return;
  }
  let value = event.target.value;
  if (["x", "y", "width", "height"].includes(event.target.name)) {
    value = clamp01(Number(value) / 100);
  } else if (event.target.name === "lineAngle") {
    value = normalizeAngle(value);
  }
  let patch = { [event.target.name]: value };
  if (annotation.markStyle === "underline" && currentPage && ["x", "y", "width", "height", "lineAngle"].includes(event.target.name)) {
    patch = getUpdatedUnderlineGeometryPatch(annotation, patch, currentPage);
  }
  updateCurrentAnnotation(
    patch,
    {
      renderMainPanel: [
        "type",
        "markStyle",
        "color",
        "originalText",
        "simplifiedText",
        "customGlyphId",
        "lineAngle",
        "x",
        "y",
        "width",
        "height",
      ].includes(event.target.name),
      renderInspector: event.target.name === "markStyle",
    }
  );
}

function updateCurrentPage(
  patch,
  { renderSidebar: shouldRenderSidebar = true, renderMainPanel: shouldRenderMainPanel = true, renderInspector: shouldRenderInspector = true } = {}
) {
  const currentPage = getCurrentPage();
  if (!currentPage) {
    return;
  }
  state.pages = state.pages.map((page) => (page.id === currentPage.id ? { ...page, ...patch } : page));
  persistState();
  if (shouldRenderSidebar) {
    renderSidebar();
  }
  if (shouldRenderMainPanel) {
    renderMainPanel();
  }
  if (shouldRenderInspector) {
    renderInspector();
  }
}

function updateCurrentAnnotation(
  patch,
  { renderMainPanel: shouldRenderMainPanel = true, renderInspector: shouldRenderInspector = true } = {}
) {
  const currentPage = getCurrentPage();
  if (!currentPage) {
    return;
  }
  state.pages = state.pages.map((page) =>
    page.id === currentPage.id
      ? {
          ...page,
          annotations: page.annotations.map((annotation) =>
            annotation.id === state.ui.currentAnnotationId ? { ...annotation, ...patch } : annotation
          ),
        }
      : page
  );
  persistState();
  if (shouldRenderMainPanel) {
    renderMainPanel();
  }
  if (shouldRenderInspector) {
    renderInspector();
  }
}

function duplicateCurrentAnnotation() {
  const currentPage = getCurrentPage();
  const annotation = getCurrentAnnotation();
  if (!currentPage || !annotation) {
    return;
  }
  const offsetX = clamp01(annotation.x + 0.01) - annotation.x;
  const offsetY = clamp01(annotation.y + 0.01) - annotation.y;
  const duplicate = {
    ...annotation,
    id: `annotation-${crypto.randomUUID()}`,
    x: annotation.x + offsetX,
    y: annotation.y + offsetY,
    lineStartX: hasExplicitUnderlineEndpoints(annotation) ? clamp01(annotation.lineStartX + offsetX) : annotation.lineStartX,
    lineStartY: hasExplicitUnderlineEndpoints(annotation) ? clamp01(annotation.lineStartY + offsetY) : annotation.lineStartY,
    lineEndX: hasExplicitUnderlineEndpoints(annotation) ? clamp01(annotation.lineEndX + offsetX) : annotation.lineEndX,
    lineEndY: hasExplicitUnderlineEndpoints(annotation) ? clamp01(annotation.lineEndY + offsetY) : annotation.lineEndY,
  };
  state.pages = state.pages.map((page) =>
    page.id === currentPage.id ? { ...page, annotations: [...page.annotations, duplicate] } : page
  );
  state.ui.currentAnnotationId = duplicate.id;
  persistState();
  renderAll();
  updateStatus("已复制当前标注。");
}

function deleteCurrentAnnotation() {
  const currentPage = getCurrentPage();
  const annotation = getCurrentAnnotation();
  if (!currentPage || !annotation) {
    return;
  }
  state.pages = state.pages.map((page) =>
    page.id === currentPage.id
      ? { ...page, annotations: page.annotations.filter((item) => item.id !== annotation.id) }
      : page
  );
  state.ui.currentAnnotationId = null;
  persistState();
  renderAll();
  updateStatus("已删除当前标注。");
}

async function createGlyphFromCurrentAnnotation() {
  const currentPage = getCurrentPage();
  const annotation = getCurrentAnnotation();
  if (!currentPage || !annotation) {
    return;
  }
  if (annotation.type !== "char") {
    updateStatus("只有“字”类型标注支持一键造字。", true);
    return;
  }

  try {
    updateStatus("正在根据当前框选生成字型图...");
    const pageImage = await getPageImageForGlyph(currentPage);
    const imageDataUrl = cropAnnotationToDataUrl(pageImage, annotation);
    const linkedGlyph = annotation.customGlyphId
      ? state.glyphs.find((glyph) => glyph.id === annotation.customGlyphId) || null
      : null;
    const glyph = {
      id: linkedGlyph?.id || `glyph-${crypto.randomUUID()}`,
      unicode: linkedGlyph?.unicode || nextPrivateUnicode(state.glyphs),
      traditional: annotation.originalText || linkedGlyph?.traditional || "",
      simplified: annotation.simplifiedText || linkedGlyph?.simplified || "",
      description:
        linkedGlyph?.description ||
        `第 ${currentPage.pageNo} 页框选生成${currentPage.title ? `：${currentPage.title}` : ""}`,
      imageDataUrl,
    };

    state.glyphs = upsertById(state.glyphs, glyph);
    state.pages = state.pages.map((page) =>
      page.id === currentPage.id
        ? {
            ...page,
            annotations: page.annotations.map((item) =>
              item.id === annotation.id ? { ...item, customGlyphId: glyph.id } : item
            ),
          }
        : page
    );
    state.ui.editingGlyphId = glyph.id;
    persistState();
    renderAll();
    updateStatus(`已生成造字 ${glyph.unicode}，并关联到当前框选。`);
  } catch (error) {
    console.error("generate glyph failed", error);
    updateStatus("一键造字失败，请确认当前页面图片已正常加载。", true);
  }
}

function normalizeDictionaryQuery(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, "");
}

function buildAncientDictionaryLookupUrl(query) {
  if (!query) {
    return "";
  }
  if (query.length === 1) {
    return `https://www.zdic.net/hans/${encodeURIComponent(query)}`;
  }
  return `https://www.baidu.com/s?wd=${encodeURIComponent(`${query} \u53e4\u6c49\u8bed\u8bcd\u5178`)}`;
}

function lookupAncientDictionaryForCurrentAnnotation() {
  const annotation = getCurrentAnnotation();
  if (!annotation) {
    return;
  }
  if (annotation.type !== "char") {
    updateStatus("\u53ea\u6709\u201c\u5b57\u201d\u7c7b\u578b\u6807\u6ce8\u652f\u6301\u67e5\u8be2\u53e4\u6c49\u8bed\u8bcd\u5178\u3002", true);
    return;
  }
  const query = normalizeDictionaryQuery(annotation.originalText);
  if (!query) {
    updateStatus("\u8bf7\u5148\u5728\u201c\u539f\u6587\u5f55\u5165\u201d\u4e2d\u586b\u5199\u8981\u67e5\u8be2\u7684\u5b57\u8bcd\u3002", true);
    return;
  }
  const lookupUrl = buildAncientDictionaryLookupUrl(query);
  const popup = window.open(lookupUrl, "_blank", "noopener,noreferrer");
  if (!popup) {
    updateStatus("\u672a\u80fd\u6253\u5f00\u8bcd\u5178\u9875\u9762\uff0c\u8bf7\u68c0\u67e5\u6d4f\u89c8\u5668\u662f\u5426\u62e6\u622a\u4e86\u65b0\u6807\u7b7e\u9875\u3002", true);
    return;
  }
  updateStatus(`\u5df2\u6253\u5f00\u201c${query}\u201d\u7684\u53e4\u6c49\u8bed\u8bcd\u5178\u67e5\u8be2\u3002`);
}

function removeCurrentPage() {
  const currentPage = getCurrentPage();
  if (!currentPage || state.pages.length === 1) {
    updateStatus("至少需要保留一页，无法删除。", true);
    return;
  }
  state.pages = state.pages
    .filter((page) => page.id !== currentPage.id)
    .map((page, index) => ({ ...page, pageNo: index + 1 }));
  state.ui.currentPageId = state.pages[0].id;
  state.ui.currentAnnotationId = null;
  persistState();
  renderAll();
  updateStatus("已删除当前页。");
}

function updatePageDimensions(width, height) {
  const currentPage = getCurrentPage();
  if (!currentPage || (!width && !height)) {
    return;
  }
  const nextPage = { ...currentPage, width, height };
  const repairedAnnotations = currentPage.annotations.map((annotation) => repairUnderlineAnnotation(annotation, nextPage));
  const annotationsChanged = repairedAnnotations.some((annotation, index) =>
    ["x", "y", "width", "height", "lineAngle", "lineStartX", "lineStartY", "lineEndX", "lineEndY"].some(
      (key) => annotation[key] !== currentPage.annotations[index][key]
    )
  );
  if (currentPage.width === width && currentPage.height === height && !annotationsChanged) {
    return;
  }
  updateCurrentPage({ width, height, annotations: repairedAnnotations });
}

function setupDrawing() {
  const layer = document.getElementById("annotationLayer");
  if (!layer) {
    return;
  }

  let isDrawing = false;
  let startPoint = null;
  let dragMode = null;
  let activeAnnotationId = null;
  let initialBounds = null;
  let interactionMoved = false;
  let interactionRect = null;
  let dragPointerOffset = null;

  const resetInteraction = (pointerId = null) => {
    isDrawing = false;
    startPoint = null;
    dragMode = null;
    activeAnnotationId = null;
    initialBounds = null;
    interactionMoved = false;
    interactionRect = null;
    dragPointerOffset = null;
    draftSelection = null;
    if (layer.isConnected) {
      renderDraftBox(layer);
    }
    if (layer.isConnected && pointerId !== null && pointerId !== undefined) {
      layer.releasePointerCapture?.(pointerId);
    }
  };

  layer.onpointerdown = (event) => {
    if (event.button !== 0) {
      return;
    }
    interactionRect = createInteractionFrame(layer);
    startPoint = getLayerPoint(event, interactionRect);
    const resizeHandle = event.target.closest(".resize-handle");
    const boxHit = event.target.closest(".annotation-box");
    const underlineElement = event.target.closest(".annotation-underline");
    const hit = boxHit || underlineElement;
    const underlineHit = event.target.closest("[data-underline-hit]");
    if (resizeHandle && boxHit) {
      activeAnnotationId = boxHit.dataset.annotationId;
      dragMode = "resize";
      interactionMoved = false;
      initialBounds = getAnnotationById(activeAnnotationId);
      selectAnnotation(activeAnnotationId, { rerenderMainPanel: false, renderInspector: false });
      layer.setPointerCapture?.(event.pointerId);
      return;
    }
    if (hit) {
      if (hit.dataset.style === "underline" && !underlineHit) {
        return;
      }
      if (
        hit.dataset.style === "underline" &&
        getPointToUnderlineDistance(getAnnotationById(hit.dataset.annotationId), startPoint, interactionRect) > UNDERLINE_DRAG_TOLERANCE_PX
      ) {
        return;
      }
      activeAnnotationId = hit.dataset.annotationId;
      dragMode = hit.dataset.style === "underline" ? "move-underline" : "move";
      interactionMoved = false;
      initialBounds = getAnnotationById(activeAnnotationId);
      dragPointerOffset = dragMode === "move" ? getPointerOffsetWithinElement(hit, event) : null;
      selectAnnotation(activeAnnotationId, { rerenderMainPanel: false, renderInspector: false });
      layer.setPointerCapture?.(event.pointerId);
      return;
    }
    isDrawing = true;
    draftSelection =
      state.ui.drawStyle === "underline"
        ? createUnderlineDraftSelection(startPoint, startPoint, interactionRect)
        : { style: state.ui.drawStyle, left: startPoint.x, top: startPoint.y, width: 0, height: 0 };
    renderDraftBox(layer);
    layer.setPointerCapture?.(event.pointerId);
  };

  layer.onpointermove = (event) => {
    if (dragMode && activeAnnotationId && initialBounds && startPoint) {
      interactionMoved = true;
      const current = getLayerPoint(event, interactionRect || createInteractionFrame(layer));
      const nextBounds =
        dragMode === "move-underline"
          ? getMovedUnderlineBounds(initialBounds, startPoint, current, interactionRect)
          : dragMode === "move"
          ? getMovedBounds(initialBounds, current, interactionRect, dragPointerOffset)
          : getResizedBoundsFromTopRight(initialBounds, current, interactionRect);
      applyBoundsToAnnotationElement(activeAnnotationId, nextBounds);
      return;
    }
    if (!isDrawing || !startPoint) {
      return;
    }
    const current = getLayerPoint(event, interactionRect);
    draftSelection =
      state.ui.drawStyle === "underline"
        ? createUnderlineDraftSelection(startPoint, current, interactionRect)
        : {
            style: state.ui.drawStyle,
            left: Math.min(startPoint.x, current.x),
            top: Math.min(startPoint.y, current.y),
            width: Math.abs(current.x - startPoint.x),
            height: Math.abs(current.y - startPoint.y),
          };
    renderDraftBox(layer);
  };

  const finishDrawing = (event) => {
    const rect = interactionRect || createInteractionFrame(layer);
    if (dragMode && activeAnnotationId && initialBounds && startPoint) {
      if (!interactionMoved) {
        resetInteraction(event.pointerId);
        return;
      }
      const current = getLayerPoint(event, rect);
      const nextBounds =
        dragMode === "move-underline"
          ? getMovedUnderlineBounds(initialBounds, startPoint, current, rect)
          : dragMode === "move"
          ? getMovedBounds(initialBounds, current, rect, dragPointerOffset)
          : getResizedBoundsFromTopRight(initialBounds, current, rect);
      commitAnnotationPatch(activeAnnotationId, nextBounds, interactionMoved);
      resetInteraction(event.pointerId);
      return;
    }
    if (!isDrawing || !startPoint) {
      resetInteraction(event.pointerId);
      return;
    }
    const current = getLayerPoint(event, rect);
    const width = Math.abs(current.x - startPoint.x);
    const height = Math.abs(current.y - startPoint.y);
    const lineLength = Math.hypot(current.x - startPoint.x, current.y - startPoint.y);
    if (state.ui.drawStyle === "underline") {
      if (lineLength >= UNDERLINE_MIN_LENGTH_PX) {
        addAnnotation(getUnderlineBoundsFromPoints(startPoint, current, rect));
      }
    } else if (width >= ANNOTATION_MIN_SIZE_PX && height >= ANNOTATION_MIN_SIZE_PX) {
      const left = Math.min(startPoint.x, current.x);
      const top = Math.min(startPoint.y, current.y);
      addAnnotation({
        x: left / rect.width,
        y: top / rect.height,
        width: width / rect.width,
        height: height / rect.height,
      });
    }
    resetInteraction(event.pointerId);
  };

  layer.onpointerup = finishDrawing;
  layer.onpointercancel = finishDrawing;
  layer.onpointerleave = null;
}

function addAnnotation(bounds) {
  const currentPage = getCurrentPage();
  if (!currentPage) {
    return;
  }
  const annotation = normalizeAnnotation(
    {
      id: `annotation-${crypto.randomUUID()}`,
      type: state.ui.drawType,
      markStyle: state.ui.drawStyle,
      color: "#a64032",
      originalText: "",
      simplifiedText: "",
      note: "",
      noteType: "1",
      customGlyphId: "",
      customCode: "",
      lineAngle: 0,
      ...bounds,
    },
    currentPage.annotations.length
  );
  state.pages = state.pages.map((page) =>
    page.id === currentPage.id ? { ...page, annotations: [...page.annotations, annotation] } : page
  );
  state.ui.currentAnnotationId = annotation.id;
  persistState();
  renderAll();
  if (annotation.type !== "image") {
    runOcrForCurrentAnnotation({ silent: true });
  }
  updateStatus("已新增一条标注，请在右侧填写属性。");
}

function renderDraftBox(layer) {
  let draft = layer.querySelector(".draft-box");
  if (!draftSelection) {
    if (draft) {
      draft.remove();
    }
    return;
  }
  if (!draft) {
    draft = document.createElement("div");
    draft.className = "draft-box";
    layer.appendChild(draft);
  }
  if (draftSelection.style === "underline") {
    if (!draft.querySelector("svg")) {
      draft.innerHTML = `
        <svg class="draft-underline-shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line class="draft-underline-line" vector-effect="non-scaling-stroke"></line>
        </svg>
      `;
    }
    draft.style.left = "0";
    draft.style.top = "0";
    draft.style.width = "100%";
    draft.style.height = "100%";
    draft.style.border = "none";
    draft.style.background = "transparent";
    draft.style.transform = "none";
    draft.style.transformOrigin = "center center";
    draft.style.borderRadius = "0";
    draft.style.marginTop = "0";
    draft.style.opacity = "0.7";
    const line = draft.querySelector(".draft-underline-line");
    line?.setAttribute("x1", `${draftSelection.start.x * 100}`);
    line?.setAttribute("y1", `${draftSelection.start.y * 100}`);
    line?.setAttribute("x2", `${draftSelection.end.x * 100}`);
    line?.setAttribute("y2", `${draftSelection.end.y * 100}`);
    return;
  }
  draft.innerHTML = "";
  draft.style.left = `${draftSelection.left}px`;
  draft.style.top = `${draftSelection.top}px`;
  draft.style.width = `${draftSelection.width}px`;
  draft.style.height = `${draftSelection.height}px`;
  draft.style.border = "2px dashed var(--accent)";
  draft.style.background = "rgba(159, 59, 47, 0.12)";
  draft.style.transform = "none";
  draft.style.transformOrigin = "center center";
  draft.style.borderRadius = "8px";
  draft.style.marginTop = "0";
  draft.style.opacity = "1";
}

function renderAnnotationBox(annotation, page = null) {
  return annotation.markStyle === "underline"
    ? renderUnderlineAnnotation(annotation, page)
    : renderBoxAnnotation(annotation);
}

function renderBoxAnnotation(annotation) {
  const fillColor = `${annotation.color}44`;
  return `
    <div
      class="annotation-item annotation-box ${annotation.id === state.ui.currentAnnotationId ? "active" : ""}"
      data-annotation-id="${annotation.id}"
      data-style="${annotation.markStyle}"
      style="
        left:${annotation.x * 100}%;
        top:${annotation.y * 100}%;
        width:${annotation.width * 100}%;
        height:${annotation.height * 100}%;
        --annotation-color:${annotation.color};
        --annotation-fill:${fillColor};
      "
      title="${escapeAttribute(annotation.originalText || ANNOTATION_TYPES[annotation.type])}"
    >
      <span class="annotation-shape"></span>
      <span class="tag">${ANNOTATION_TYPES[annotation.type]}</span>
      <span class="resize-handle" title="拖动缩放"></span>
    </div>
  `;
}

function renderUnderlineAnnotation(annotation, page = null) {
  const frame = page ? createStoredPageFrame(page) : null;
  const endpoints = getUnderlineNormalizedEndpoints(annotation, frame);
  const tagAnchor = getUnderlineTagAnchor(annotation, frame);
  return `
    <div
      class="annotation-item annotation-underline ${annotation.id === state.ui.currentAnnotationId ? "active" : ""}"
      data-annotation-id="${annotation.id}"
      data-style="${annotation.markStyle}"
      style="
        left:0;
        top:0;
        width:100%;
        height:100%;
        --annotation-color:${annotation.color};
      "
      title="${escapeAttribute(annotation.originalText || ANNOTATION_TYPES[annotation.type])}"
    >
      <svg class="annotation-shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line
          class="annotation-line-hit"
          data-underline-hit="true"
          vector-effect="non-scaling-stroke"
          x1="${endpoints.start.x * 100}"
          y1="${endpoints.start.y * 100}"
          x2="${endpoints.end.x * 100}"
          y2="${endpoints.end.y * 100}"
        ></line>
        <line
          class="annotation-line-visible"
          vector-effect="non-scaling-stroke"
          x1="${endpoints.start.x * 100}"
          y1="${endpoints.start.y * 100}"
          x2="${endpoints.end.x * 100}"
          y2="${endpoints.end.y * 100}"
        ></line>
      </svg>
      <span class="tag" style="left:${tagAnchor.x * 100}%;top:${tagAnchor.y * 100}%;">${ANNOTATION_TYPES[annotation.type]}</span>
    </div>
  `;
}

function createInteractionFrame(layer) {
  const rect = layer.getBoundingClientRect();
  return {
    rect,
    width: layer.offsetWidth || layer.clientWidth || rect.width,
    height: layer.offsetHeight || layer.clientHeight || rect.height,
  };
}

function resolveFrameMetrics(frame) {
  if (frame?.rect) {
    return {
      rect: frame.rect,
      width: frame.width ?? frame.rect.width,
      height: frame.height ?? frame.rect.height,
    };
  }
  const rect = typeof frame?.getBoundingClientRect === "function" ? frame.getBoundingClientRect() : frame;
  return {
    rect,
    width: frame?.offsetWidth || frame?.clientWidth || rect.width,
    height: frame?.offsetHeight || frame?.clientHeight || rect.height,
  };
}

function getLayerPoint(event, frame) {
  const metrics = resolveFrameMetrics(frame);
  const width = Math.max(1, metrics.width);
  const height = Math.max(1, metrics.height);
  const rectWidth = Math.max(1, metrics.rect.width);
  const rectHeight = Math.max(1, metrics.rect.height);
  return {
    x: clamp(((event.clientX - metrics.rect.left) / rectWidth) * width, 0, width),
    y: clamp(((event.clientY - metrics.rect.top) / rectHeight) * height, 0, height),
  };
}

function getAnnotationById(annotationId) {
  const currentPage = getCurrentPage();
  return currentPage?.annotations.find((annotation) => annotation.id === annotationId) || null;
}

function selectAnnotation(annotationId, { rerenderMainPanel = true, renderInspector = true, persist = true } = {}) {
  state.ui.currentAnnotationId = annotationId;
  if (persist) {
    persistState();
  }
  if (rerenderMainPanel) {
    renderMainPanel();
  } else {
    syncActiveAnnotationElement();
  }
  if (renderInspector) {
    renderInspector();
  }
}

function getPointerOffsetWithinElement(element, event) {
  const elementRect = element.getBoundingClientRect();
  const width = element.offsetWidth || element.clientWidth || elementRect.width;
  const height = element.offsetHeight || element.clientHeight || elementRect.height;
  return {
    x: clamp(((event.clientX - elementRect.left) / Math.max(1, elementRect.width)) * width, 0, width),
    y: clamp(((event.clientY - elementRect.top) / Math.max(1, elementRect.height)) * height, 0, height),
  };
}

function getMovedBounds(annotation, currentPoint, frame, pointerOffset = { x: 0, y: 0 }) {
  const rect = resolveFrameMetrics(frame);
  return {
    x: clamp((currentPoint.x - pointerOffset.x) / rect.width, 0, Math.max(0, 1 - annotation.width)),
    y: clamp((currentPoint.y - pointerOffset.y) / rect.height, 0, Math.max(0, 1 - annotation.height)),
    width: clamp(annotation.width, 0.005, 1),
    height: clamp(annotation.height, 0.005, 1),
  };
}

function getMovedUnderlineBounds(annotation, dragStartPoint, currentPoint, frame) {
  const rect = resolveFrameMetrics(frame);
  const endpoints = getUnderlineNormalizedEndpoints(annotation, frame);
  const deltaX = (currentPoint.x - dragStartPoint.x) / rect.width;
  const deltaY = (currentPoint.y - dragStartPoint.y) / rect.height;
  const clampedDeltaX = clamp(
    deltaX,
    -Math.min(endpoints.start.x, endpoints.end.x),
    1 - Math.max(endpoints.start.x, endpoints.end.x)
  );
  const clampedDeltaY = clamp(
    deltaY,
    -Math.min(endpoints.start.y, endpoints.end.y),
    1 - Math.max(endpoints.start.y, endpoints.end.y)
  );
  return getUnderlineBoundsFromNormalizedPoints(
    {
      x: endpoints.start.x + clampedDeltaX,
      y: endpoints.start.y + clampedDeltaY,
    },
    {
      x: endpoints.end.x + clampedDeltaX,
      y: endpoints.end.y + clampedDeltaY,
    },
    frame
  );
}

function getClosestPointOnSegment(startPoint, endPoint, point) {
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared <= UNDERLINE_COMPONENT_EPSILON) {
    return { x: startPoint.x, y: startPoint.y };
  }
  const projection =
    ((point.x - startPoint.x) * dx + (point.y - startPoint.y) * dy) / Math.max(lengthSquared, UNDERLINE_COMPONENT_EPSILON);
  const ratio = clamp(projection, 0, 1);
  return {
    x: startPoint.x + dx * ratio,
    y: startPoint.y + dy * ratio,
  };
}

function getPointToUnderlineDistance(annotation, point, frame) {
  const endpoints = getUnderlineEndpoints(annotation, frame);
  const closestPoint = getClosestPointOnSegment(endpoints.start, endpoints.end, point);
  return Math.hypot(point.x - closestPoint.x, point.y - closestPoint.y);
}

function getUnderlineBoundsFromNormalizedPoints(startPoint, endPoint, frame) {
  const rect = resolveFrameMetrics(frame);
  return getUnderlineBoundsFromPoints(
    {
      x: startPoint.x * rect.width,
      y: startPoint.y * rect.height,
    },
    {
      x: endPoint.x * rect.width,
      y: endPoint.y * rect.height,
    },
    frame
  );
}

function getLegacyUnderlineLocalPositions(annotation, frame = null) {
  const width = Math.max(annotation.width, 0.0001);
  const height = Math.max(annotation.height, 0.0001);
  if (frame) {
    const metrics = resolveFrameMetrics(frame);
    const endpoints = getUnderlineEndpoints(annotation, frame);
    const leftPx = annotation.x * metrics.width;
    const topPx = annotation.y * metrics.height;
    const widthPx = Math.max(annotation.width * metrics.width, 0.0001);
    const heightPx = Math.max(annotation.height * metrics.height, 0.0001);
    return {
      start: {
        x: clamp(((endpoints.start.x - leftPx) / widthPx) * 100, 0, 100),
        y: clamp(((endpoints.start.y - topPx) / heightPx) * 100, 0, 100),
      },
      end: {
        x: clamp(((endpoints.end.x - leftPx) / widthPx) * 100, 0, 100),
        y: clamp(((endpoints.end.y - topPx) / heightPx) * 100, 0, 100),
      },
    };
  }
  const angle = (normalizeAngle(annotation.lineAngle) * Math.PI) / 180;
  const lengthCandidates = [];
  const cos = Math.abs(Math.cos(angle));
  const sin = Math.abs(Math.sin(angle));
  if (cos > UNDERLINE_COMPONENT_EPSILON) {
    lengthCandidates.push(width / cos);
  }
  if (sin > UNDERLINE_COMPONENT_EPSILON) {
    lengthCandidates.push(height / sin);
  }
  const lineLength = lengthCandidates.length ? Math.min(...lengthCandidates) : Math.max(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const dx = Math.cos(angle) * (lineLength / 2);
  const dy = Math.sin(angle) * (lineLength / 2);
  return {
    start: {
      x: clamp(((centerX - dx) / width) * 100, 0, 100),
      y: clamp(((centerY - dy) / height) * 100, 0, 100),
    },
    end: {
      x: clamp(((centerX + dx) / width) * 100, 0, 100),
      y: clamp(((centerY + dy) / height) * 100, 0, 100),
    },
  };
}

function getUnderlineNormalizedEndpoints(annotation, frame = null) {
  if (hasExplicitUnderlineEndpoints(annotation)) {
    return {
      start: {
        x: annotation.lineStartX,
        y: annotation.lineStartY,
      },
      end: {
        x: annotation.lineEndX,
        y: annotation.lineEndY,
      },
    };
  }
  const localPositions = getLegacyUnderlineLocalPositions(annotation, frame);
  return {
    start: {
      x: clamp01(annotation.x + annotation.width * (localPositions.start.x / 100)),
      y: clamp01(annotation.y + annotation.height * (localPositions.start.y / 100)),
    },
    end: {
      x: clamp01(annotation.x + annotation.width * (localPositions.end.x / 100)),
      y: clamp01(annotation.y + annotation.height * (localPositions.end.y / 100)),
    },
  };
}

function getUnderlineTagAnchor(annotation, frame = null) {
  const endpoints = getUnderlineNormalizedEndpoints(annotation, frame);
  const startIsHigher =
    endpoints.start.y < endpoints.end.y ||
    (Math.abs(endpoints.start.y - endpoints.end.y) <= UNDERLINE_COMPONENT_EPSILON && endpoints.start.x <= endpoints.end.x);
  const anchorPoint = startIsHigher ? endpoints.start : endpoints.end;
  return {
    x: clamp01(anchorPoint.x),
    y: clamp01(anchorPoint.y),
  };
}

function getResizedBoundsFromTopRight(annotation, currentPoint, frame) {
  const rect = resolveFrameMetrics(frame);
  const minSize = 12;
  const leftPx = annotation.x * rect.width;
  const bottomPx = (annotation.y + annotation.height) * rect.height;
  const nextRightPx = clamp(currentPoint.x, leftPx + minSize, rect.width);
  const nextTopPx = clamp(currentPoint.y, 0, bottomPx - minSize);
  return {
    x: annotation.x,
    y: nextTopPx / rect.height,
    width: (nextRightPx - leftPx) / rect.width,
    height: (bottomPx - nextTopPx) / rect.height,
  };
}

function getUnderlineEndpoints(annotation, frame) {
  const rect = resolveFrameMetrics(frame);
  if (hasExplicitUnderlineEndpoints(annotation)) {
    return {
      start: { x: annotation.lineStartX * rect.width, y: annotation.lineStartY * rect.height },
      end: { x: annotation.lineEndX * rect.width, y: annotation.lineEndY * rect.height },
    };
  }
  const angle = (normalizeAngle(annotation.lineAngle) * Math.PI) / 180;
  const centerX = (annotation.x + annotation.width / 2) * rect.width;
  const centerY = (annotation.y + annotation.height / 2) * rect.height;
  const lineLength = getUnderlineLineLength(annotation, frame);
  const dx = Math.cos(angle) * (lineLength / 2);
  const dy = Math.sin(angle) * (lineLength / 2);
  return {
    start: { x: centerX - dx, y: centerY - dy },
    end: { x: centerX + dx, y: centerY + dy },
  };
}

function getUnderlineLineLength(annotation, frame) {
  const rect = resolveFrameMetrics(frame);
  const angle = (normalizeAngle(annotation.lineAngle) * Math.PI) / 180;
  const widthPx = Math.max(annotation.width * rect.width, UNDERLINE_MIN_THICKNESS_PX);
  const heightPx = Math.max(annotation.height * rect.height, UNDERLINE_MIN_THICKNESS_PX);
  const cos = Math.abs(Math.cos(angle));
  const sin = Math.abs(Math.sin(angle));
  const widthMatchesMinThickness = Math.abs(widthPx - UNDERLINE_MIN_THICKNESS_PX) < 0.01;
  const heightMatchesMinThickness = Math.abs(heightPx - UNDERLINE_MIN_THICKNESS_PX) < 0.01;
  if (heightMatchesMinThickness && !widthMatchesMinThickness && cos > UNDERLINE_COMPONENT_EPSILON) {
    return widthPx / cos;
  }
  if (widthMatchesMinThickness && !heightMatchesMinThickness && sin > UNDERLINE_COMPONENT_EPSILON) {
    return heightPx / sin;
  }
  const lengthCandidates = [];
  if (cos > UNDERLINE_COMPONENT_EPSILON) {
    lengthCandidates.push(widthPx / cos);
  }
  if (sin > UNDERLINE_COMPONENT_EPSILON) {
    lengthCandidates.push(heightPx / sin);
  }
  return lengthCandidates.length ? Math.min(...lengthCandidates) : Math.max(widthPx, heightPx);
}

function applyBoundsToAnnotationElement(annotationId, bounds) {
  const element = document.querySelector(`.annotation-item[data-annotation-id="${annotationId}"]`);
  if (!element) {
    return;
  }
  if (element.classList.contains("annotation-underline")) {
    applyUnderlineGeometryToElement(element, bounds);
    return;
  }
  element.style.left = `${bounds.x * 100}%`;
  element.style.top = `${bounds.y * 100}%`;
  element.style.width = `${bounds.width * 100}%`;
  element.style.height = `${bounds.height * 100}%`;
}

function applyUnderlineGeometryToElement(element, annotation) {
  const frame = createStoredPageFrame(getCurrentPage());
  const endpoints = getUnderlineNormalizedEndpoints(annotation, frame);
  const tagAnchor = getUnderlineTagAnchor(annotation, frame);
  element.style.left = "0";
  element.style.top = "0";
  element.style.width = "100%";
  element.style.height = "100%";
  element.querySelectorAll(".annotation-shape line").forEach((line) => {
    line.setAttribute("x1", `${endpoints.start.x * 100}`);
    line.setAttribute("y1", `${endpoints.start.y * 100}`);
    line.setAttribute("x2", `${endpoints.end.x * 100}`);
    line.setAttribute("y2", `${endpoints.end.y * 100}`);
  });
  element.querySelector(".tag")?.setAttribute("style", `left:${tagAnchor.x * 100}%;top:${tagAnchor.y * 100}%;`);
}

function syncActiveAnnotationElement() {
  document.querySelectorAll(".annotation-item").forEach((element) => {
    element.classList.toggle("active", element.dataset.annotationId === state.ui.currentAnnotationId);
  });
}

function getLineAngle(startPoint, endPoint) {
  return normalizeAngle((Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180) / Math.PI);
}

function normalizePointToFrame(point, frame) {
  const rect = resolveFrameMetrics(frame);
  return {
    x: clamp((point.x || 0) / Math.max(1, rect.width), 0, 1),
    y: clamp((point.y || 0) / Math.max(1, rect.height), 0, 1),
  };
}

function createUnderlineDraftSelection(startPoint, endPoint, frame) {
  return {
    style: "underline",
    start: normalizePointToFrame(startPoint, frame),
    end: normalizePointToFrame(endPoint, frame),
  };
}

function getUnderlineBoundsFromPoints(startPoint, endPoint, frame) {
  const rect = resolveFrameMetrics(frame);
  const clampedStart = {
    x: clamp(startPoint.x, 0, rect.width),
    y: clamp(startPoint.y, 0, rect.height),
  };
  const clampedEnd = {
    x: clamp(endPoint.x, 0, rect.width),
    y: clamp(endPoint.y, 0, rect.height),
  };
  const rawWidth = Math.abs(clampedEnd.x - clampedStart.x);
  const rawHeight = Math.abs(clampedEnd.y - clampedStart.y);
  const widthPx = Math.max(rawWidth, UNDERLINE_MIN_THICKNESS_PX);
  const heightPx = Math.max(rawHeight, UNDERLINE_MIN_THICKNESS_PX);
  const leftPx = clamp(
    Math.min(clampedStart.x, clampedEnd.x) - (widthPx - rawWidth) / 2,
    0,
    Math.max(0, rect.width - widthPx)
  );
  const topPx = clamp(
    Math.min(clampedStart.y, clampedEnd.y) - (heightPx - rawHeight) / 2,
    0,
    Math.max(0, rect.height - heightPx)
  );
  return {
    x: leftPx / rect.width,
    y: topPx / rect.height,
    width: widthPx / rect.width,
    height: heightPx / rect.height,
    lineAngle: getLineAngle(clampedStart, clampedEnd),
    lineStartX: clampedStart.x / rect.width,
    lineStartY: clampedStart.y / rect.height,
    lineEndX: clampedEnd.x / rect.width,
    lineEndY: clampedEnd.y / rect.height,
  };
}

function hasExplicitUnderlineEndpoints(annotation) {
  return ["lineStartX", "lineStartY", "lineEndX", "lineEndY"].every((key) => Number.isFinite(annotation?.[key]));
}

function createStoredPageFrame(page) {
  const width = Math.max(1, Number(page?.width) || 1);
  const height = Math.max(1, Number(page?.height) || 1);
  return {
    rect: { left: 0, top: 0, width, height },
    width,
    height,
  };
}

function getUpdatedUnderlineGeometryPatch(annotation, patch, page) {
  const frame = createStoredPageFrame(page);
  const geometryPatch = { ...patch };
  if (!["x", "y", "width", "height", "lineAngle"].some((key) => key in patch)) {
    return geometryPatch;
  }
  const localPositions = getLegacyUnderlineLocalPositions(annotation, frame);
  const nextBounds = {
    x: "x" in patch ? patch.x : annotation.x,
    y: "y" in patch ? patch.y : annotation.y,
    width: "width" in patch ? patch.width : annotation.width,
    height: "height" in patch ? patch.height : annotation.height,
  };
  if (["x", "y", "width", "height"].some((key) => key in patch)) {
    geometryPatch.lineStartX = clamp01(nextBounds.x + nextBounds.width * (localPositions.start.x / 100));
    geometryPatch.lineStartY = clamp01(nextBounds.y + nextBounds.height * (localPositions.start.y / 100));
    geometryPatch.lineEndX = clamp01(nextBounds.x + nextBounds.width * (localPositions.end.x / 100));
    geometryPatch.lineEndY = clamp01(nextBounds.y + nextBounds.height * (localPositions.end.y / 100));
  }
  if ("lineAngle" in patch) {
    const baseAnnotation = { ...annotation, ...geometryPatch, ...nextBounds };
    const endpoints = getUnderlineEndpoints(baseAnnotation, frame);
    const lineLength = Math.hypot(endpoints.end.x - endpoints.start.x, endpoints.end.y - endpoints.start.y);
    const angle = (normalizeAngle(patch.lineAngle) * Math.PI) / 180;
    const centerX = (baseAnnotation.x + baseAnnotation.width / 2) * frame.width;
    const centerY = (baseAnnotation.y + baseAnnotation.height / 2) * frame.height;
    const dx = Math.cos(angle) * (lineLength / 2);
    const dy = Math.sin(angle) * (lineLength / 2);
    geometryPatch.lineStartX = clamp01((centerX - dx) / frame.width);
    geometryPatch.lineStartY = clamp01((centerY - dy) / frame.height);
    geometryPatch.lineEndX = clamp01((centerX + dx) / frame.width);
    geometryPatch.lineEndY = clamp01((centerY + dy) / frame.height);
  }
  return geometryPatch;
}

function repairUnderlineAnnotation(annotation, page) {
  if (annotation.markStyle !== "underline" || hasExplicitUnderlineEndpoints(annotation) || !page?.width || !page?.height) {
    return annotation;
  }
  const frame = createStoredPageFrame(page);
  const endpoints = getUnderlineEndpoints(annotation, frame);
  return {
    ...annotation,
    ...getUnderlineBoundsFromPoints(endpoints.start, endpoints.end, frame),
  };
}

function commitAnnotationPatch(annotationId, patch, moved) {
  state.pages = state.pages.map((page) =>
    page.id === state.ui.currentPageId
      ? {
          ...page,
          annotations: page.annotations.map((annotation) =>
            annotation.id === annotationId ? { ...annotation, ...patch } : annotation
          ),
        }
      : page
  );
  persistState();
  if (moved) {
    renderMainPanel();
  }
  renderInspector();
}

function renderGlyphCard(glyph) {
  return `
    <div class="glyph-card ${glyph.id === state.ui.editingGlyphId ? "active" : ""}" data-glyph-id="${glyph.id}">
      <strong>${escapeHtml(glyph.unicode)}</strong>
      <div>原字：${escapeHtml(glyph.traditional || "未填写")}</div>
      <div>简体：${escapeHtml(glyph.simplified || "未填写")}</div>
      <div class="mini-note">${escapeHtml(glyph.description || "暂无说明")}</div>
      ${glyph.imageDataUrl ? `<img src="${glyph.imageDataUrl}" alt="${escapeAttribute(glyph.unicode)}" />` : ""}
    </div>
  `;
}

function getCurrentPage() {
  return state.pages.find((page) => page.id === state.ui.currentPageId) || state.pages[0] || null;
}

async function runOcrForCurrentPage() {
  const currentPage = getCurrentPage();
  if (!currentPage) {
    updateStatus("No page is available for OCR.", true);
    return;
  }
  if (ocrRequestInFlight) {
    updateStatus("OCR is already running. Please wait.", true);
    return;
  }

  ocrRequestInFlight = true;
  try {
    updateStatus("Running Baidu OCR for the current page...");
    const pageImage = await getPageImageForGlyph(currentPage);
    const pageWidth = pageImage.naturalWidth || pageImage.width || currentPage.width;
    const pageHeight = pageImage.naturalHeight || pageImage.height || currentPage.height;
    if (!pageWidth || !pageHeight) {
      throw new Error("page image size unavailable");
    }

    const imageDataUrl = imageToDataUrl(pageImage);
    const result = await requestOcrForImage(imageDataUrl, currentPage.id);
    const ocrAnnotations = buildAnnotationsFromOcrItems(result.items, { width: pageWidth, height: pageHeight });
    const retainedAnnotations = currentPage.annotations.filter((annotation) => annotation.source !== OCR_SOURCE_BAIDU_PAGE);
    state.pages = state.pages.map((page) =>
      page.id === currentPage.id
        ? {
            ...page,
            width: pageWidth,
            height: pageHeight,
            annotations: [...retainedAnnotations, ...ocrAnnotations],
          }
        : page
    );
    state.ui.currentAnnotationId = ocrAnnotations[0]?.id || retainedAnnotations[0]?.id || null;
    persistState();
    renderAll();
    updateStatus(
      ocrAnnotations.length
        ? `Baidu OCR completed. Imported ${ocrAnnotations.length} annotations.`
        : "Baidu OCR completed, but no text was imported."
    );
  } catch (error) {
    console.error("run ocr failed", error);
    updateStatus(error.message || "Baidu OCR failed.", true);
  } finally {
    ocrRequestInFlight = false;
  }
}

async function runOcrForCurrentAnnotation({ silent = false } = {}) {
  const currentPage = getCurrentPage();
  const annotation = getCurrentAnnotation();
  if (!currentPage || !annotation) {
    if (!silent) {
      updateStatus("Select an annotation before running OCR.", true);
    }
    return;
  }
  if (annotation.type === "image") {
    if (!silent) {
      updateStatus("Image annotations do not support text OCR.", true);
    }
    return;
  }
  if (ocrRequestInFlight) {
    if (!silent) {
      updateStatus("OCR is already running. Please wait.", true);
    }
    return;
  }

  ocrRequestInFlight = true;
  try {
    if (!silent) {
      updateStatus("Running Baidu OCR for the selected annotation...");
    }
    const pageImage = await getPageImageForGlyph(currentPage);
    const imageDataUrl = cropAnnotationToDataUrl(pageImage, annotation, { paddingRatio: OCR_SELECTION_PADDING_RATIO });
    const result = await requestOcrForImage(imageDataUrl, currentPage.id);
    const recognizedText = mergeOcrItemsToText(result.items);
    if (!recognizedText) {
      if (!silent) {
        updateStatus("No text was recognized inside the selected annotation.");
      }
      return;
    }

    const confidence = getOcrConfidenceAverage(result.items);
    updateCurrentAnnotation(
      {
        originalText: recognizedText,
        source: OCR_SOURCE_BAIDU_SELECTION,
        ocrConfidence: confidence,
      },
      {
        renderMainPanel: true,
        renderInspector: true,
      }
    );
    if (!silent) {
      updateStatus(`Filled original text with OCR: ${recognizedText}`);
    }
  } catch (error) {
    console.error("run annotation ocr failed", error);
    if (!silent) {
      updateStatus(error.message || "Baidu OCR failed for the selected annotation.", true);
    }
  } finally {
    ocrRequestInFlight = false;
  }
}

function clearOcrAnnotationsForCurrentPage() {
  const currentPage = getCurrentPage();
  if (!currentPage) {
    return;
  }
  const retainedAnnotations = currentPage.annotations.filter((annotation) => annotation.source !== OCR_SOURCE_BAIDU_PAGE);
  const removedCount = currentPage.annotations.length - retainedAnnotations.length;
  if (!removedCount) {
    updateStatus("There are no OCR annotations on this page.");
    return;
  }

  state.pages = state.pages.map((page) =>
    page.id === currentPage.id ? { ...page, annotations: retainedAnnotations } : page
  );
  if (state.ui.currentAnnotationId && !retainedAnnotations.some((annotation) => annotation.id === state.ui.currentAnnotationId)) {
    state.ui.currentAnnotationId = retainedAnnotations[0]?.id || null;
  }
  persistState();
  renderAll();
  updateStatus(`Cleared ${removedCount} OCR annotations from the current page.`);
}

async function requestOcrForImage(imageDataUrl, pageId = "") {
  const response = await fetch("/api/ocr/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageId,
      imageDataUrl,
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || "Baidu OCR request failed.");
  }
  return result;
}

function mergeOcrItemsToText(items) {
  if (!Array.isArray(items) || !items.length) {
    return "";
  }
  return items
    .map((item) => String(item?.text || "").trim())
    .filter(Boolean)
    .join("");
}

function getOcrConfidenceAverage(items) {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }
  const numericValues = items
    .map((item) => Number(item?.confidence))
    .filter((value) => Number.isFinite(value));
  if (!numericValues.length) {
    return null;
  }
  const sum = numericValues.reduce((total, value) => total + value, 0);
  return round(sum / numericValues.length);
}

function getCurrentAnnotation() {
  const currentPage = getCurrentPage();
  return currentPage?.annotations.find((annotation) => annotation.id === state.ui.currentAnnotationId) || null;
}

function getEditingGlyph() {
  return state.glyphs.find((glyph) => glyph.id === state.ui.editingGlyphId) || null;
}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("persist state failed", error);
    updateStatus("浏览器存储空间不足，建议导出项目 JSON 备份。", true);
  }
}

function updateStatus(message, isError = false) {
  elements.statusMessage.textContent = message;
  elements.statusMessage.classList.toggle("danger", isError);
}

function showRuntimeHint() {
  if (window.location.protocol === "file:") {
    updateStatus(
      "Start start-local-server.bat and open http://127.0.0.1:8000/index.html so PDF import, Baidu OCR, and local assets work correctly.",
      true
    );
  }
}

function handleGlobalKeydown(event) {
  if (event.key !== "Delete") {
    return;
  }
  if (isEditableTarget(event.target)) {
    return;
  }
  if (!state.ui.currentAnnotationId || state.ui.activeTab !== "editor") {
    return;
  }
  event.preventDefault();
  deleteCurrentAnnotation();
}

function buildXml(appState) {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>'];
  lines.push(
    `<article id="${escapeXml(appState.meta.articleId)}" type="${escapeXml(appState.meta.type)}" version="${escapeXml(
      appState.meta.version
    )}">`
  );
  lines.push("  <head>");
  lines.push(
    `    <title name="${escapeXml(appState.meta.title)}" note="${escapeXml(appState.meta.notes)}" type="1">${escapeXml(
      appState.meta.title
    )}</title>`
  );
  lines.push(
    `    <subtitle name="${escapeXml(appState.meta.subtitle)}" note="" type="0">${escapeXml(
      appState.meta.subtitle
    )}</subtitle>`
  );
  lines.push("    <authors>");
  splitAuthors(appState.meta.authors).forEach((author, index) => {
    lines.push(
      `      <author name="${escapeXml(author)}" id="author-${index + 1}" note="" type="0">${escapeXml(author)}</author>`
    );
  });
  lines.push("    </authors>");
  lines.push(
    `    <book name="${escapeXml(appState.meta.bookName)}" id="book-1" note="" type="1" volume="${escapeXml(
      appState.meta.bookVolume
    )}" issue="1" />`
  );
  lines.push(`    <relation note="${escapeXml(appState.meta.relationNote)}" type="1" />`);
  lines.push("    <date>");
  lines.push(
    `      <publish_date year="${escapeXml(appState.meta.publishYear)}" dynasty="${escapeXml(
      appState.meta.publishDynasty
    )}" note="" />`
  );
  lines.push(
    `      <writing_date year="${escapeXml(appState.meta.writingYear)}" dynasty="${escapeXml(
      appState.meta.writingDynasty
    )}" note="" />`
  );
  lines.push("    </date>");
  lines.push("  </head>");

  lines.push("  <content>");
  appState.pages.forEach((page) => {
    lines.push(
      `    <page layout="2" id="${escapeXml(page.id)}" page_no="${page.pageNo}" direction="${page.direction}">`
    );
    if (!page.annotations.length) {
      lines.push(`      <panel id="${escapeXml(page.id)}-panel-empty" position="1" direction="${page.direction}" />`);
    }
    page.annotations.forEach((annotation, index) => {
      const panelId = `${annotation.id}-panel`;
      const textfieldId = `${annotation.id}-textfield`;
      lines.push(`      <panel id="${escapeXml(panelId)}" position="${index + 1}" direction="${page.direction}">`);
      lines.push(`        <textfield id="${escapeXml(textfieldId)}" position="${index + 1}" direction="${page.direction}">`);
      if (annotation.type === "paragraph") {
        lines.push(
          `          <paragraph id="${escapeXml(annotation.id)}" type="0" note="${escapeXml(
            annotation.note
          )}" data-mark="${escapeXml(annotation.markStyle)}" angle="${round(annotation.lineAngle)}" x1="${round(annotation.x * 100)}" y1="${round(
            annotation.y * 100
          )}" x2="${round((annotation.x + annotation.width) * 100)}" y2="${round(
            (annotation.y + annotation.height) * 100
          )}" simplified="${escapeXml(annotation.simplifiedText)}">${escapeXml(annotation.originalText)}</paragraph>`
        );
      } else if (annotation.type === "sentence") {
        lines.push(
          `          <sentence id="${escapeXml(annotation.id)}" type="0" note="${escapeXml(
            annotation.note
          )}" note_type="${escapeXml(annotation.noteType)}" data-mark="${escapeXml(annotation.markStyle)}" angle="${round(annotation.lineAngle)}" x1="${round(
            annotation.x * 100
          )}" y1="${round(annotation.y * 100)}" x2="${round((annotation.x + annotation.width) * 100)}" y2="${round(
            (annotation.y + annotation.height) * 100
          )}" simplified="${escapeXml(annotation.simplifiedText)}">${escapeXml(annotation.originalText)}</sentence>`
        );
      } else if (annotation.type === "image") {
        lines.push(
          `          <img id="${escapeXml(annotation.id)}" src="" note="${escapeXml(
            annotation.note
          )}" name="${escapeXml(annotation.originalText)}" position="${index + 1}" angle="${round(
            annotation.lineAngle
          )}" x1="${round(annotation.x * 100)}" y1="${round(annotation.y * 100)}" x2="${round(
            (annotation.x + annotation.width) * 100
          )}" y2="${round((annotation.y + annotation.height) * 100)}" />`
        );
      } else {
        const code = resolveAnnotationCode(annotation, appState.glyphs);
        lines.push(`          <word id="${escapeXml(annotation.id)}-word" note="${escapeXml(annotation.note)}">`);
        lines.push(
          `            <char id="${escapeXml(annotation.id)}" code="${escapeXml(code)}" simplified="${escapeXml(
            annotation.simplifiedText
          )}" data-mark="${escapeXml(annotation.markStyle)}" angle="${round(annotation.lineAngle)}" x1="${round(annotation.x * 100)}" y1="${round(
            annotation.y * 100
          )}" x2="${round((annotation.x + annotation.width) * 100)}" y2="${round(
            (annotation.y + annotation.height) * 100
          )}">${escapeXml(annotation.originalText)}</char>`
        );
        if (annotation.note) {
          lines.push("            <word_notes>");
          lines.push(
            `              <word_note id="${escapeXml(annotation.id)}-note" note_type="${escapeXml(
              annotation.noteType
            )}">${escapeXml(annotation.note)}</word_note>`
          );
          lines.push("            </word_notes>");
        }
        lines.push("          </word>");
      }
      lines.push("        </textfield>");
      lines.push("      </panel>");
    });
    lines.push("    </page>");
  });
  lines.push("  </content>");

  lines.push(
    `  <view count="${appState.pages.length}" pages="${appState.pages.map((page) => page.pageNo).join(",")}">`
  );
  appState.pages.forEach((page) => {
    lines.push(
      `    <svg width="${page.width || 0}" height="${page.height || 0}" notes="${escapeXml(page.note)}" id="svg-${escapeXml(
        page.id
      )}" page_no="${page.pageNo}">`
    );
    page.annotations.forEach((annotation) => {
      const x = round(annotation.x * (page.width || 1000));
      const y = round(annotation.y * (page.height || 1000));
      const width = round(annotation.width * (page.width || 1000));
      const height = round(annotation.height * (page.height || 1000));
      if (annotation.markStyle === "underline") {
        const pageWidth = page.width || 1000;
        const pageHeight = page.height || 1000;
        const endpoints = getUnderlineEndpoints(annotation, {
          rect: { left: 0, top: 0, width: pageWidth, height: pageHeight },
          width: pageWidth,
          height: pageHeight,
        });
        lines.push(
          `      <line x1="${round(endpoints.start.x)}" y1="${round(endpoints.start.y)}" x2="${round(endpoints.end.x)}" y2="${round(endpoints.end.y)}" stroke="${escapeXml(
            annotation.color
          )}" data-angle="${round(annotation.lineAngle)}" />`
        );
      } else {
        lines.push(
          `      <rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="${escapeXml(
            annotation.color
          )}" fill="${annotation.markStyle === "highlight" ? escapeXml(`${annotation.color}44`) : "transparent"}" />`
        );
      }
      if (annotation.type === "image") {
        lines.push(
          `      <image x="${x}" y="${y}" width="${width}" height="${height}" href="" data-type="image" data-label="${escapeXml(
            annotation.originalText || ANNOTATION_TYPES[annotation.type]
          )}" />`
        );
      } else {
        lines.push(
          `      <text x="${x}" y="${Math.max(18, y + 18)}" data-type="${escapeXml(annotation.type)}">${escapeXml(
            annotation.originalText || ANNOTATION_TYPES[annotation.type]
          )}</text>`
        );
      }
    });
    lines.push("    </svg>");
  });
  lines.push("  </view>");

  const sourceType = appState.pages[0]?.sourceType || 2;
  lines.push(`  <sources type="${sourceType}">`);
  appState.pages.forEach((page) => {
    lines.push(`    <source src="${escapeXml(page.src)}" pageno="${page.pageNo}" />`);
  });
  lines.push("  </sources>");

  lines.push("  <custom_chars>");
  appState.glyphs.forEach((glyph) => {
    lines.push(
      `    <glyph unicode="${escapeXml(glyph.unicode)}" traditional="${escapeXml(
        glyph.traditional
      )}" simplified="${escapeXml(glyph.simplified)}" image="${escapeXml(serializeGlyphImageForXml(glyph.imageDataUrl))}">${escapeXml(
        glyph.description
      )}</glyph>`
    );
  });
  lines.push("  </custom_chars>");
  lines.push("</article>");
  return lines.join("\n");
}

function resolveAnnotationCode(annotation, glyphs) {
  const glyph = glyphs.find((item) => item.id === annotation.customGlyphId);
  return glyph?.unicode || annotation.customCode || "";
}

function splitAuthors(value) {
  return value
    .split(/[\uFF0C,\u3001;\uFF1B]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function nextPrivateUnicode(glyphs) {
  let code = 0xe000;
  const used = new Set(glyphs.map((glyph) => glyph.unicode?.replace(/^U\+/i, "").toUpperCase()));
  while (used.has(code.toString(16).toUpperCase())) {
    code += 1;
  }
  return code.toString(16).toUpperCase();
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function ensurePdfSupport() {
  if (pdfjsLib?.getDocument) {
    return true;
  }
  updateStatus("未找到本地 PDF 组件，请确认 vendor/pdfjs 目录里有 pdf.mjs 和 pdf.worker.mjs。", true);
  return false;
}

async function importPdfAsPages(file) {
  const pdfData = await file.arrayBuffer();
  const task = pdfjsLib.getDocument({ data: pdfData });
  const pdf = await task.promise;
  const importedPages = [];
  const baseTitle = String(file.name || "pdf-import").replace(/\.[^.]+$/, "");

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    updateStatus(`正在导入 PDF：第 ${pageNumber}/${pdf.numPages} 页...`);
    await waitForNextFrame();

    const page = await pdf.getPage(pageNumber);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = Math.min(2.2, Math.max(1.25, 1800 / Math.max(baseViewport.width, 1)));
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: false });

    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    if (!context) {
      throw new Error("canvas 2d context unavailable");
    }

    await page.render({ canvasContext: context, viewport }).promise;

    importedPages.push({
      id: `page-${crypto.randomUUID()}`,
      title: `${baseTitle} / 第 ${pageNumber} 页`,
      src: canvas.toDataURL("image/png"),
      pageNo: state.pages.length + importedPages.length + 1,
      note: "",
      direction: viewport.width > viewport.height ? 1 : 0,
      sourceType: 1,
      width: canvas.width,
      height: canvas.height,
      annotations: [],
    });

    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();
  }

  pdf.cleanup?.();
  await task.destroy();
  return importedPages;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function imageToDataUrl(image, mimeType = "image/png") {
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  if (!width || !height) {
    throw new Error("page image size unavailable");
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) {
    throw new Error("canvas 2d context unavailable");
  }
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL(mimeType);
}

function buildAnnotationsFromOcrItems(items, pageMetrics) {
  if (!Array.isArray(items) || !pageMetrics?.width || !pageMetrics?.height) {
    return [];
  }

  return items
    .map((item, index) => createAnnotationFromOcrItem(item, pageMetrics, index))
    .filter(Boolean);
}

function createAnnotationFromOcrItem(item, pageMetrics, index) {
  const text = String(item?.text || "").trim();
  const left = Number(item?.left);
  const top = Number(item?.top);
  const width = Number(item?.width);
  const height = Number(item?.height);
  if (!text || !Number.isFinite(left) || !Number.isFinite(top) || !Number.isFinite(width) || !Number.isFinite(height)) {
    return null;
  }

  const safeLeft = clamp(left, 0, Math.max(0, pageMetrics.width - 1));
  const safeTop = clamp(top, 0, Math.max(0, pageMetrics.height - 1));
  const safeRight = clamp(left + width, safeLeft + 1, pageMetrics.width);
  const safeBottom = clamp(top + height, safeTop + 1, pageMetrics.height);
  return normalizeAnnotation(
    {
      id: `annotation-${crypto.randomUUID()}`,
      type: String(item?.level || "").toLowerCase() === "word" ? "sentence" : "char",
      markStyle: "box",
      color: "#2f6c9f",
      originalText: text,
      simplifiedText: "",
      note: "",
      noteType: "1",
      customGlyphId: "",
      customCode: "",
      lineAngle: 0,
      x: safeLeft / pageMetrics.width,
      y: safeTop / pageMetrics.height,
      width: (safeRight - safeLeft) / pageMetrics.width,
      height: (safeBottom - safeTop) / pageMetrics.height,
      source: OCR_SOURCE_BAIDU_PAGE,
      ocrConfidence: Number.isFinite(Number(item?.confidence)) ? Number(item.confidence) : null,
    },
    index
  );
}

function getPageImageForGlyph(page) {
  const currentPage = getCurrentPage();
  const liveImage =
    currentPage?.id === page.id && state.ui.activeTab === "editor" ? document.getElementById("pageImage") : null;
  if (liveImage?.complete && liveImage.naturalWidth && liveImage.naturalHeight) {
    return Promise.resolve(liveImage);
  }

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("page image load failed"));
    image.src = page.src;
  });
}

function cropAnnotationToDataUrl(image, annotation, { paddingRatio = 0 } = {}) {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  if (!imageWidth || !imageHeight) {
    throw new Error("page image size unavailable");
  }

  const rawLeft = annotation.x * imageWidth;
  const rawTop = annotation.y * imageHeight;
  const rawRight = (annotation.x + annotation.width) * imageWidth;
  const rawBottom = (annotation.y + annotation.height) * imageHeight;
  const paddingX = Math.max(1, (rawRight - rawLeft) * Math.max(0, paddingRatio));
  const paddingY = Math.max(1, (rawBottom - rawTop) * Math.max(0, paddingRatio));

  const left = clamp(Math.floor(rawLeft - paddingX), 0, Math.max(0, imageWidth - 1));
  const top = clamp(Math.floor(rawTop - paddingY), 0, Math.max(0, imageHeight - 1));
  const right = clamp(Math.ceil(rawRight + paddingX), left + 1, imageWidth);
  const bottom = clamp(Math.ceil(rawBottom + paddingY), top + 1, imageHeight);
  const cropWidth = Math.max(1, right - left);
  const cropHeight = Math.max(1, bottom - top);

  const canvas = document.createElement("canvas");
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("canvas 2d context unavailable");
  }

  context.drawImage(image, left, top, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
  return canvas.toDataURL("image/png");
}

function serializeGlyphImageForXml(imageDataUrl) {
  if (!imageDataUrl) {
    return "";
  }
  const value = String(imageDataUrl);
  const base64Index = value.indexOf("base64,");
  if (base64Index !== -1) {
    return value.slice(base64Index + 7);
  }
  const commaIndex = value.indexOf(",");
  return commaIndex !== -1 ? value.slice(commaIndex + 1) : value;
}

function upsertById(items, nextItem) {
  const index = items.findIndex((item) => item.id === nextItem.id);
  if (index === -1) {
    return [...items, nextItem];
  }
  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value) {
  return clamp(Number.isFinite(value) ? value : 0, 0, 1);
}

function normalizeAngle(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return 0;
  }
  const normalized = ((num % 360) + 360) % 360;
  return normalized;
}

function round(value) {
  return Number(value.toFixed(2));
}

function slugify(value) {
  return String(value || "guji-project")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "")
    .toLowerCase();
}

function waitForNextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#96;");
}

function escapeXml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}
