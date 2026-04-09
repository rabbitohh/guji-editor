const pdfjsLib = window.pdfjsLib || null;
if (pdfjsLib?.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "./vendor/pdfjs/pdf.worker.min.js";
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

renderAll();
bindGlobalEvents();

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
    },
  };
}

function normalizeAnnotation(annotation, order) {
  const x = clamp01(Number(annotation.x) || 0);
  const y = clamp01(Number(annotation.y) || 0);
  const width = clamp01(Number(annotation.width) || 0.1);
  const height = clamp01(Number(annotation.height) || 0.1);
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
      updateStatus("PDF 导入失败，请确认本地 pdf.min.js 和 pdf.worker.min.js 已放到 vendor/pdfjs 目录。", true);
    }
  });

  document.addEventListener("keydown", handleGlobalKeydown);
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
      </div>
      <div class="canvas-wrap">
        <div class="canvas-stage" id="canvasStage">
          <img id="pageImage" src="${currentPage.src}" alt="${escapeHtml(currentPage.title)}" />
          <div class="annotation-layer" id="annotationLayer">
            ${currentPage.annotations.map((annotation) => renderAnnotationBox(annotation)).join("")}
          </div>
        </div>
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

  elements.mainPanel.querySelectorAll("[data-annotation-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.ui.currentAnnotationId = row.dataset.annotationId;
      persistState();
      renderMainPanel();
      renderInspector();
    });
  });

  const pageImage = document.getElementById("pageImage");
  pageImage.addEventListener("load", () => {
    updatePageDimensions(pageImage.naturalWidth, pageImage.naturalHeight);
    setupDrawing();
  });
  if (pageImage.complete) {
    updatePageDimensions(pageImage.naturalWidth, pageImage.naturalHeight);
    setupDrawing();
  }
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
  if (!annotation) {
    return;
  }
  let value = event.target.value;
  if (["x", "y", "width", "height"].includes(event.target.name)) {
    value = clamp01(Number(value) / 100);
  } else if (event.target.name === "lineAngle") {
    value = normalizeAngle(value);
  }
  updateCurrentAnnotation(
    { [event.target.name]: value },
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
  const duplicate = {
    ...annotation,
    id: `annotation-${crypto.randomUUID()}`,
    x: clamp01(annotation.x + 0.01),
    y: clamp01(annotation.y + 0.01),
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
  if (currentPage.width === width && currentPage.height === height) {
    return;
  }
  updateCurrentPage({ width, height });
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

  layer.onpointerdown = (event) => {
    if (event.button !== 0) {
      return;
    }
    interactionRect = layer.getBoundingClientRect();
    const rotateHandle = event.target.closest(".rotate-handle");
    const resizeHandle = event.target.closest(".resize-handle");
    const hit = event.target.closest(".annotation-box");
    if (rotateHandle && hit) {
      activeAnnotationId = hit.dataset.annotationId;
      dragMode = "rotate";
      interactionMoved = false;
      startPoint = getLayerPoint(event, interactionRect);
      initialBounds = getAnnotationById(activeAnnotationId);
      selectAnnotation(activeAnnotationId, { rerenderMainPanel: false, renderInspector: false });
      layer.setPointerCapture?.(event.pointerId);
      return;
    }
    if (resizeHandle && hit) {
      activeAnnotationId = hit.dataset.annotationId;
      dragMode = "resize";
      interactionMoved = false;
      startPoint = getLayerPoint(event, interactionRect);
      initialBounds = getAnnotationById(activeAnnotationId);
      selectAnnotation(activeAnnotationId, { rerenderMainPanel: false, renderInspector: false });
      layer.setPointerCapture?.(event.pointerId);
      return;
    }
    if (hit) {
      activeAnnotationId = hit.dataset.annotationId;
      dragMode = "move";
      interactionMoved = false;
      startPoint = getLayerPoint(event, interactionRect);
      initialBounds = getAnnotationById(activeAnnotationId);
      dragPointerOffset = getPointerOffsetWithinElement(hit, event);
      selectAnnotation(activeAnnotationId, { rerenderMainPanel: false, renderInspector: false });
      layer.setPointerCapture?.(event.pointerId);
      return;
    }
    startPoint = getLayerPoint(event, interactionRect);
    isDrawing = true;
    draftSelection = { left: startPoint.x, top: startPoint.y, width: 0, height: 0 };
    renderDraftBox(layer);
    layer.setPointerCapture?.(event.pointerId);
  };

  layer.onpointermove = (event) => {
    if (dragMode && activeAnnotationId && initialBounds && startPoint) {
      interactionMoved = true;
      const current = getLayerPoint(event, interactionRect);
      if (dragMode === "rotate") {
        const nextAngle = getRotationAngle(initialBounds, current, interactionRect);
        applyAngleToAnnotationElement(activeAnnotationId, nextAngle);
        return;
      }
      const nextBounds =
        dragMode === "move"
          ? getMovedBounds(initialBounds, current, interactionRect, dragPointerOffset)
          : getResizedBoundsFromTopRight(initialBounds, current, interactionRect);
      applyBoundsToAnnotationElement(activeAnnotationId, nextBounds);
      return;
    }
    if (!isDrawing || !startPoint) {
      return;
    }
    const current = getLayerPoint(event, interactionRect);
    draftSelection = {
      left: Math.min(startPoint.x, current.x),
      top: Math.min(startPoint.y, current.y),
      width: Math.abs(current.x - startPoint.x),
      height: Math.abs(current.y - startPoint.y),
    };
    renderDraftBox(layer);
  };

  const finishDrawing = (event) => {
    const rect = interactionRect || layer.getBoundingClientRect();
    if (dragMode && activeAnnotationId && initialBounds && startPoint) {
      const current = getLayerPoint(event, rect);
      if (dragMode === "rotate") {
        const nextAngle = getRotationAngle(initialBounds, current, rect);
        commitAnnotationPatch(activeAnnotationId, { lineAngle: nextAngle }, interactionMoved);
      } else {
        const nextBounds =
          dragMode === "move"
            ? getMovedBounds(initialBounds, current, rect, dragPointerOffset)
            : getResizedBoundsFromTopRight(initialBounds, current, rect);
        commitAnnotationPatch(activeAnnotationId, nextBounds, interactionMoved);
      }
      dragMode = null;
      activeAnnotationId = null;
      initialBounds = null;
      startPoint = null;
      interactionMoved = false;
      interactionRect = null;
      dragPointerOffset = null;
      layer.releasePointerCapture?.(event.pointerId);
      return;
    }
    if (!isDrawing || !startPoint) {
      interactionRect = null;
      return;
    }
    const current = getLayerPoint(event, rect);
    const width = Math.abs(current.x - startPoint.x);
    const height = Math.abs(current.y - startPoint.y);
    if (width > 8 && height > 8) {
      const left = Math.min(startPoint.x, current.x);
      const top = Math.min(startPoint.y, current.y);
      addAnnotation({
        x: left / rect.width,
        y: top / rect.height,
        width: width / rect.width,
        height: height / rect.height,
      });
    }
    isDrawing = false;
    startPoint = null;
    draftSelection = null;
    interactionRect = null;
    renderDraftBox(layer);
    layer.releasePointerCapture?.(event.pointerId);
  };

  layer.onpointerup = finishDrawing;
  layer.onpointercancel = finishDrawing;
  layer.onpointerleave = (event) => {
    if (isDrawing) {
      finishDrawing(event);
    }
  };
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
  draft.style.left = `${draftSelection.left}px`;
  draft.style.top = `${draftSelection.top}px`;
  draft.style.width = `${draftSelection.width}px`;
  draft.style.height = `${draftSelection.height}px`;
}

function renderAnnotationBox(annotation) {
  const fillColor = `${annotation.color}44`;
  const rotation = annotation.markStyle === "underline" ? normalizeAngle(annotation.lineAngle) : 0;
  const lineLengthPercent = annotation.markStyle === "underline" ? getUnderlineLineLengthPercent(annotation) : 100;
  return `
    <div
      class="annotation-box ${annotation.id === state.ui.currentAnnotationId ? "active" : ""}"
      data-annotation-id="${annotation.id}"
      data-style="${annotation.markStyle}"
      style="
        left:${annotation.x * 100}%;
        top:${annotation.y * 100}%;
        width:${annotation.width * 100}%;
        height:${annotation.height * 100}%;
        --annotation-color:${annotation.color};
        --annotation-fill:${fillColor};
        --annotation-rotation:${rotation}deg;
        --annotation-line-length:${lineLengthPercent}%;
      "
      title="${escapeAttribute(annotation.originalText || ANNOTATION_TYPES[annotation.type])}"
    >
      <span class="annotation-shape"></span>
      <span class="tag">${ANNOTATION_TYPES[annotation.type]}</span>
      ${annotation.markStyle === "underline" ? `<span class="rotate-handle" title="拖动旋转"></span>` : ""}
      <span class="resize-handle" title="拖动缩放"></span>
    </div>
  `;
}

function resolveFrameRect(frame) {
  return typeof frame?.getBoundingClientRect === "function" ? frame.getBoundingClientRect() : frame;
}

function getLayerPoint(event, frame) {
  const rect = resolveFrameRect(frame);
  return {
    x: clamp(event.clientX - rect.left, 0, rect.width),
    y: clamp(event.clientY - rect.top, 0, rect.height),
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
  return {
    x: event.clientX - elementRect.left,
    y: event.clientY - elementRect.top,
  };
}

function getMovedBounds(annotation, currentPoint, frame, pointerOffset = { x: 0, y: 0 }) {
  const rect = resolveFrameRect(frame);
  return {
    x: clamp((currentPoint.x - pointerOffset.x) / rect.width, 0, Math.max(0, 1 - annotation.width)),
    y: clamp((currentPoint.y - pointerOffset.y) / rect.height, 0, Math.max(0, 1 - annotation.height)),
    width: clamp(annotation.width, 0.005, 1),
    height: clamp(annotation.height, 0.005, 1),
  };
}

function getResizedBoundsFromTopRight(annotation, currentPoint, frame) {
  const rect = resolveFrameRect(frame);
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

function applyBoundsToAnnotationElement(annotationId, bounds) {
  const element = document.querySelector(`.annotation-box[data-annotation-id="${annotationId}"]`);
  if (!element) {
    return;
  }
  element.style.left = `${bounds.x * 100}%`;
  element.style.top = `${bounds.y * 100}%`;
  element.style.width = `${bounds.width * 100}%`;
  element.style.height = `${bounds.height * 100}%`;
  if (element.dataset.style === "underline") {
    element.style.setProperty("--annotation-line-length", `${getUnderlineLineLengthPercent(bounds)}%`);
  }
}

function syncActiveAnnotationElement() {
  document.querySelectorAll(".annotation-box").forEach((element) => {
    element.classList.toggle("active", element.dataset.annotationId === state.ui.currentAnnotationId);
  });
}

function applyAngleToAnnotationElement(annotationId, angle) {
  const element = document.querySelector(`.annotation-box[data-annotation-id="${annotationId}"]`);
  if (!element) {
    return;
  }
  element.style.setProperty("--annotation-rotation", `${normalizeAngle(angle)}deg`);
}

function getRotationAngle(annotation, currentPoint, frame) {
  const rect = resolveFrameRect(frame);
  const centerX = (annotation.x + annotation.width / 2) * rect.width;
  const centerY = (annotation.y + annotation.height / 2) * rect.height;
  const dx = currentPoint.x - centerX;
  const dy = currentPoint.y - centerY;
  return normalizeAngle((Math.atan2(dy, dx) * 180) / Math.PI);
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
        const angle = (normalizeAngle(annotation.lineAngle) * Math.PI) / 180;
        const centerX = x + width / 2;
        const centerY = y + height / 2;
        const lineLength = Math.max(width, height);
        const dx = Math.cos(angle) * (lineLength / 2);
        const dy = Math.sin(angle) * (lineLength / 2);
        lines.push(
          `      <line x1="${round(centerX - dx)}" y1="${round(centerY - dy)}" x2="${round(centerX + dx)}" y2="${round(centerY + dy)}" stroke="${escapeXml(
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
      )}" simplified="${escapeXml(glyph.simplified)}" image="${escapeXml(glyph.imageDataUrl || "")}">${escapeXml(
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
  updateStatus("未找到本地 PDF 组件，请确认 vendor/pdfjs 目录里有 pdf.min.js 和 pdf.worker.min.js。", true);
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

function getUnderlineLineLengthPercent(bounds) {
  const baseWidth = Math.max(bounds.width, 0.0001);
  const diagonal = Math.hypot(bounds.width, bounds.height);
  return Math.max(100, round((diagonal / baseWidth) * 100));
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
