/**
 * Tablebase loader using OPFS (Origin Private File System)
 * Handles downloading, storing, and loading DTM tablebases
 */

// Base URL for tablebase files (configure as needed)
const TABLEBASE_BASE_URL = './tablebases/';

// List of DTM tablebase files (up to 5 pieces)
const DTM_FILES = [
    'dtm_000011.bin', 'dtm_000012.bin', 'dtm_000013.bin', 'dtm_000014.bin',
    'dtm_000021.bin', 'dtm_000022.bin', 'dtm_000023.bin', 'dtm_000031.bin',
    'dtm_000032.bin', 'dtm_000041.bin', 'dtm_000110.bin', 'dtm_000111.bin',
    'dtm_000112.bin', 'dtm_000113.bin', 'dtm_000120.bin', 'dtm_000121.bin',
    'dtm_000122.bin', 'dtm_000130.bin', 'dtm_000131.bin', 'dtm_000140.bin',
    'dtm_000210.bin', 'dtm_000211.bin', 'dtm_000212.bin', 'dtm_000220.bin',
    'dtm_000221.bin', 'dtm_000230.bin', 'dtm_000310.bin', 'dtm_000311.bin',
    'dtm_000320.bin', 'dtm_000410.bin', 'dtm_001001.bin', 'dtm_001002.bin',
    'dtm_001003.bin', 'dtm_001004.bin', 'dtm_001011.bin', 'dtm_001012.bin',
    'dtm_001013.bin', 'dtm_001021.bin', 'dtm_001022.bin', 'dtm_001031.bin',
    'dtm_001100.bin', 'dtm_001101.bin', 'dtm_001102.bin', 'dtm_001103.bin',
    'dtm_001110.bin', 'dtm_001111.bin', 'dtm_001112.bin', 'dtm_001120.bin',
    'dtm_001121.bin', 'dtm_001130.bin', 'dtm_001200.bin', 'dtm_001201.bin',
    'dtm_001202.bin', 'dtm_001210.bin', 'dtm_001211.bin', 'dtm_001220.bin',
    'dtm_001300.bin', 'dtm_001301.bin', 'dtm_001310.bin', 'dtm_001400.bin',
    'dtm_002001.bin', 'dtm_002002.bin', 'dtm_002003.bin', 'dtm_002011.bin',
    'dtm_002012.bin', 'dtm_002021.bin', 'dtm_002100.bin', 'dtm_002101.bin',
    'dtm_002102.bin', 'dtm_002110.bin', 'dtm_002111.bin', 'dtm_002120.bin',
    'dtm_002200.bin', 'dtm_002201.bin', 'dtm_002210.bin', 'dtm_002300.bin',
    'dtm_003001.bin', 'dtm_003002.bin', 'dtm_003011.bin', 'dtm_003100.bin',
    'dtm_003101.bin', 'dtm_003110.bin', 'dtm_003200.bin', 'dtm_004001.bin',
    'dtm_004100.bin', 'dtm_010010.bin', 'dtm_010011.bin', 'dtm_010012.bin',
    'dtm_010013.bin', 'dtm_010020.bin', 'dtm_010021.bin', 'dtm_010022.bin',
    'dtm_010030.bin', 'dtm_010031.bin', 'dtm_010040.bin', 'dtm_010110.bin',
    'dtm_010111.bin', 'dtm_010112.bin', 'dtm_010120.bin', 'dtm_010121.bin',
    'dtm_010130.bin', 'dtm_010210.bin', 'dtm_010211.bin', 'dtm_010220.bin',
    'dtm_010310.bin', 'dtm_011000.bin', 'dtm_011001.bin', 'dtm_011002.bin',
    'dtm_011003.bin', 'dtm_011010.bin', 'dtm_011011.bin', 'dtm_011012.bin',
    'dtm_011020.bin', 'dtm_011021.bin', 'dtm_011030.bin', 'dtm_011100.bin',
    'dtm_011101.bin', 'dtm_011102.bin', 'dtm_011110.bin', 'dtm_011111.bin',
    'dtm_011120.bin', 'dtm_011200.bin', 'dtm_011201.bin', 'dtm_011210.bin',
    'dtm_011300.bin', 'dtm_012000.bin', 'dtm_012001.bin', 'dtm_012002.bin',
    'dtm_012010.bin', 'dtm_012011.bin', 'dtm_012020.bin', 'dtm_012100.bin',
    'dtm_012101.bin', 'dtm_012110.bin', 'dtm_012200.bin', 'dtm_013000.bin',
    'dtm_013001.bin', 'dtm_013010.bin', 'dtm_013100.bin', 'dtm_014000.bin',
    'dtm_020010.bin', 'dtm_020011.bin', 'dtm_020012.bin', 'dtm_020020.bin',
    'dtm_020021.bin', 'dtm_020030.bin', 'dtm_020110.bin', 'dtm_020111.bin',
    'dtm_020120.bin', 'dtm_020210.bin', 'dtm_021000.bin', 'dtm_021001.bin',
    'dtm_021002.bin', 'dtm_021010.bin', 'dtm_021011.bin', 'dtm_021020.bin',
    'dtm_021100.bin', 'dtm_021101.bin', 'dtm_021110.bin', 'dtm_021200.bin',
    'dtm_022000.bin', 'dtm_022001.bin', 'dtm_022010.bin', 'dtm_022100.bin',
    'dtm_023000.bin', 'dtm_030010.bin', 'dtm_030011.bin', 'dtm_030020.bin',
    'dtm_030110.bin', 'dtm_031000.bin', 'dtm_031001.bin', 'dtm_031010.bin',
    'dtm_031100.bin', 'dtm_032000.bin', 'dtm_040010.bin', 'dtm_041000.bin',
    'dtm_100001.bin', 'dtm_100002.bin', 'dtm_100003.bin', 'dtm_100004.bin',
    'dtm_100011.bin', 'dtm_100012.bin', 'dtm_100013.bin', 'dtm_100021.bin',
    'dtm_100022.bin', 'dtm_100031.bin', 'dtm_100100.bin', 'dtm_100101.bin',
    'dtm_100102.bin', 'dtm_100103.bin', 'dtm_100110.bin', 'dtm_100111.bin',
    'dtm_100112.bin', 'dtm_100120.bin', 'dtm_100121.bin', 'dtm_100130.bin',
    'dtm_100200.bin', 'dtm_100201.bin', 'dtm_100202.bin', 'dtm_100210.bin',
    'dtm_100211.bin', 'dtm_100220.bin', 'dtm_100300.bin', 'dtm_100301.bin',
    'dtm_100310.bin', 'dtm_100400.bin', 'dtm_101001.bin', 'dtm_101002.bin',
    'dtm_101003.bin', 'dtm_101011.bin', 'dtm_101012.bin', 'dtm_101021.bin',
    'dtm_101100.bin', 'dtm_101101.bin', 'dtm_101102.bin', 'dtm_101110.bin',
    'dtm_101111.bin', 'dtm_101120.bin', 'dtm_101200.bin', 'dtm_101201.bin',
    'dtm_101210.bin', 'dtm_101300.bin', 'dtm_102001.bin', 'dtm_102002.bin',
    'dtm_102011.bin', 'dtm_102100.bin', 'dtm_102101.bin', 'dtm_102110.bin',
    'dtm_102200.bin', 'dtm_103001.bin', 'dtm_103100.bin', 'dtm_110000.bin',
    'dtm_110001.bin', 'dtm_110002.bin', 'dtm_110003.bin', 'dtm_110010.bin',
    'dtm_110011.bin', 'dtm_110012.bin', 'dtm_110020.bin', 'dtm_110021.bin',
    'dtm_110030.bin', 'dtm_110100.bin', 'dtm_110101.bin', 'dtm_110102.bin',
    'dtm_110110.bin', 'dtm_110111.bin', 'dtm_110120.bin', 'dtm_110200.bin',
    'dtm_110201.bin', 'dtm_110210.bin', 'dtm_110300.bin', 'dtm_111000.bin',
    'dtm_111001.bin', 'dtm_111002.bin', 'dtm_111010.bin', 'dtm_111011.bin',
    'dtm_111020.bin', 'dtm_111100.bin', 'dtm_111101.bin', 'dtm_111110.bin',
    'dtm_111200.bin', 'dtm_112000.bin', 'dtm_112001.bin', 'dtm_112010.bin',
    'dtm_112100.bin', 'dtm_113000.bin', 'dtm_120000.bin', 'dtm_120001.bin',
    'dtm_120002.bin', 'dtm_120010.bin', 'dtm_120011.bin', 'dtm_120020.bin',
    'dtm_120100.bin', 'dtm_120101.bin', 'dtm_120110.bin', 'dtm_120200.bin',
    'dtm_121000.bin', 'dtm_121001.bin', 'dtm_121010.bin', 'dtm_121100.bin',
    'dtm_122000.bin', 'dtm_130000.bin', 'dtm_130001.bin', 'dtm_130010.bin',
    'dtm_130100.bin', 'dtm_131000.bin', 'dtm_140000.bin', 'dtm_200001.bin',
    'dtm_200002.bin', 'dtm_200003.bin', 'dtm_200011.bin', 'dtm_200012.bin',
    'dtm_200021.bin', 'dtm_200100.bin', 'dtm_200101.bin', 'dtm_200102.bin',
    'dtm_200110.bin', 'dtm_200111.bin', 'dtm_200120.bin', 'dtm_200200.bin',
    'dtm_200201.bin', 'dtm_200210.bin', 'dtm_200300.bin', 'dtm_201001.bin',
    'dtm_201002.bin', 'dtm_201011.bin', 'dtm_201100.bin', 'dtm_201101.bin',
    'dtm_201110.bin', 'dtm_201200.bin', 'dtm_202001.bin', 'dtm_202100.bin',
    'dtm_210000.bin', 'dtm_210001.bin', 'dtm_210002.bin', 'dtm_210010.bin',
    'dtm_210011.bin', 'dtm_210020.bin', 'dtm_210100.bin', 'dtm_210101.bin',
    'dtm_210110.bin', 'dtm_210200.bin', 'dtm_211000.bin', 'dtm_211001.bin',
    'dtm_211010.bin', 'dtm_211100.bin', 'dtm_212000.bin', 'dtm_220000.bin',
    'dtm_220001.bin', 'dtm_220010.bin', 'dtm_220100.bin', 'dtm_221000.bin',
    'dtm_230000.bin', 'dtm_300001.bin', 'dtm_300002.bin', 'dtm_300011.bin',
    'dtm_300100.bin', 'dtm_300101.bin', 'dtm_300110.bin', 'dtm_300200.bin',
    'dtm_301001.bin', 'dtm_301100.bin', 'dtm_310000.bin', 'dtm_310001.bin',
    'dtm_310010.bin', 'dtm_310100.bin', 'dtm_311000.bin', 'dtm_320000.bin',
    'dtm_400001.bin', 'dtm_400100.bin', 'dtm_410000.bin',
];

// List of CWDL (compressed WDL) tablebase files (6-8 pieces, conjugate-selected)
// 8-piece: pawn-only configurations (no queens)
const CWDL_FILES = [
    'cwdl_000011.bin', 'cwdl_000012.bin', 'cwdl_000013.bin', 'cwdl_000014.bin',
    'cwdl_000015.bin', 'cwdl_000016.bin', 'cwdl_000021.bin', 'cwdl_000022.bin',
    'cwdl_000023.bin', 'cwdl_000024.bin', 'cwdl_000025.bin', 'cwdl_000031.bin',
    'cwdl_000032.bin', 'cwdl_000033.bin', 'cwdl_000034.bin', 'cwdl_000041.bin',
    'cwdl_000042.bin', 'cwdl_000043.bin', 'cwdl_000051.bin', 'cwdl_000052.bin',
    'cwdl_000061.bin', 'cwdl_000110.bin', 'cwdl_000111.bin', 'cwdl_000112.bin',
    'cwdl_000113.bin', 'cwdl_000114.bin', 'cwdl_000115.bin', 'cwdl_000120.bin',
    'cwdl_000121.bin', 'cwdl_000122.bin', 'cwdl_000123.bin', 'cwdl_000124.bin',
    'cwdl_000130.bin', 'cwdl_000131.bin', 'cwdl_000132.bin', 'cwdl_000133.bin',
    'cwdl_000140.bin', 'cwdl_000141.bin', 'cwdl_000142.bin', 'cwdl_000150.bin',
    'cwdl_000151.bin', 'cwdl_000160.bin', 'cwdl_000210.bin', 'cwdl_000211.bin',
    'cwdl_000212.bin', 'cwdl_000213.bin', 'cwdl_000214.bin', 'cwdl_000220.bin',
    'cwdl_000221.bin', 'cwdl_000222.bin', 'cwdl_000223.bin', 'cwdl_000230.bin',
    'cwdl_000231.bin', 'cwdl_000232.bin', 'cwdl_000240.bin', 'cwdl_000241.bin',
    'cwdl_000250.bin', 'cwdl_000310.bin', 'cwdl_000311.bin', 'cwdl_000312.bin',
    'cwdl_000320.bin', 'cwdl_000321.bin', 'cwdl_000330.bin', 'cwdl_000410.bin',
    'cwdl_001001.bin', 'cwdl_001002.bin', 'cwdl_001003.bin', 'cwdl_001004.bin',
    'cwdl_001005.bin', 'cwdl_001006.bin', 'cwdl_001011.bin', 'cwdl_001012.bin',
    'cwdl_001013.bin', 'cwdl_001014.bin', 'cwdl_001015.bin', 'cwdl_001021.bin',
    'cwdl_001022.bin', 'cwdl_001023.bin', 'cwdl_001024.bin', 'cwdl_001031.bin',
    'cwdl_001032.bin', 'cwdl_001033.bin', 'cwdl_001041.bin', 'cwdl_001042.bin',
    'cwdl_001051.bin', 'cwdl_001100.bin', 'cwdl_001101.bin', 'cwdl_001102.bin',
    'cwdl_001103.bin', 'cwdl_001104.bin', 'cwdl_001105.bin', 'cwdl_001110.bin',
    'cwdl_001111.bin', 'cwdl_001112.bin', 'cwdl_001113.bin', 'cwdl_001120.bin',
    'cwdl_001121.bin', 'cwdl_001122.bin', 'cwdl_001130.bin', 'cwdl_001131.bin',
    'cwdl_001140.bin', 'cwdl_001150.bin', 'cwdl_001200.bin', 'cwdl_001201.bin',
    'cwdl_001202.bin', 'cwdl_001203.bin', 'cwdl_001210.bin', 'cwdl_001211.bin',
    'cwdl_001212.bin', 'cwdl_001220.bin', 'cwdl_001221.bin', 'cwdl_001230.bin',
    'cwdl_001300.bin', 'cwdl_001301.bin', 'cwdl_001310.bin', 'cwdl_002001.bin',
    'cwdl_002002.bin', 'cwdl_002003.bin', 'cwdl_002004.bin', 'cwdl_002005.bin',
    'cwdl_002011.bin', 'cwdl_002012.bin', 'cwdl_002013.bin', 'cwdl_002014.bin',
    'cwdl_002021.bin', 'cwdl_002022.bin', 'cwdl_002023.bin', 'cwdl_002031.bin',
    'cwdl_002032.bin', 'cwdl_002041.bin', 'cwdl_002100.bin', 'cwdl_002101.bin',
    'cwdl_002102.bin', 'cwdl_002103.bin', 'cwdl_002110.bin', 'cwdl_002111.bin',
    'cwdl_002112.bin', 'cwdl_002120.bin', 'cwdl_002121.bin', 'cwdl_002130.bin',
    'cwdl_002200.bin', 'cwdl_002201.bin', 'cwdl_002210.bin', 'cwdl_003001.bin',
    'cwdl_003002.bin', 'cwdl_003003.bin', 'cwdl_003011.bin', 'cwdl_003012.bin',
    'cwdl_003021.bin', 'cwdl_003100.bin', 'cwdl_003101.bin', 'cwdl_003110.bin',
    'cwdl_004001.bin', 'cwdl_010010.bin', 'cwdl_010011.bin', 'cwdl_010012.bin',
    'cwdl_010013.bin', 'cwdl_010014.bin', 'cwdl_010015.bin', 'cwdl_010020.bin',
    'cwdl_010021.bin', 'cwdl_010022.bin', 'cwdl_010023.bin', 'cwdl_010024.bin',
    'cwdl_010030.bin', 'cwdl_010031.bin', 'cwdl_010032.bin', 'cwdl_010040.bin',
    'cwdl_010041.bin', 'cwdl_010050.bin', 'cwdl_010060.bin', 'cwdl_010110.bin',
    'cwdl_010111.bin', 'cwdl_010112.bin', 'cwdl_010113.bin', 'cwdl_010120.bin',
    'cwdl_010121.bin', 'cwdl_010122.bin', 'cwdl_010130.bin', 'cwdl_010210.bin',
    'cwdl_010211.bin', 'cwdl_010220.bin', 'cwdl_011000.bin', 'cwdl_011001.bin',
    'cwdl_011002.bin', 'cwdl_011003.bin', 'cwdl_011004.bin', 'cwdl_011010.bin',
    'cwdl_011011.bin', 'cwdl_011012.bin', 'cwdl_011013.bin', 'cwdl_011020.bin',
    'cwdl_011021.bin', 'cwdl_011030.bin', 'cwdl_011040.bin', 'cwdl_011100.bin',
    'cwdl_011101.bin', 'cwdl_011102.bin', 'cwdl_011110.bin', 'cwdl_011111.bin',
    'cwdl_011200.bin', 'cwdl_012000.bin', 'cwdl_012001.bin', 'cwdl_012002.bin',
    'cwdl_012010.bin', 'cwdl_012020.bin', 'cwdl_012100.bin', 'cwdl_013000.bin',
    'cwdl_020010.bin', 'cwdl_020011.bin', 'cwdl_020012.bin', 'cwdl_020020.bin',
    'cwdl_020021.bin', 'cwdl_020110.bin', 'cwdl_021000.bin', 'cwdl_021001.bin',
    'cwdl_021010.bin', 'cwdl_100001.bin', 'cwdl_100002.bin', 'cwdl_100003.bin',
    'cwdl_100004.bin', 'cwdl_100005.bin', 'cwdl_100006.bin', 'cwdl_100011.bin',
    'cwdl_100012.bin', 'cwdl_100013.bin', 'cwdl_100014.bin', 'cwdl_100021.bin',
    'cwdl_100022.bin', 'cwdl_100023.bin', 'cwdl_100031.bin', 'cwdl_100032.bin',
    'cwdl_100041.bin', 'cwdl_100042.bin', 'cwdl_100051.bin', 'cwdl_100100.bin',
    'cwdl_100101.bin', 'cwdl_100102.bin', 'cwdl_100103.bin', 'cwdl_100104.bin',
    'cwdl_100110.bin', 'cwdl_100111.bin', 'cwdl_100112.bin', 'cwdl_100120.bin',
    'cwdl_100121.bin', 'cwdl_100130.bin', 'cwdl_100131.bin', 'cwdl_100140.bin',
    'cwdl_100200.bin', 'cwdl_100201.bin', 'cwdl_100202.bin', 'cwdl_100210.bin',
    'cwdl_100220.bin', 'cwdl_100300.bin', 'cwdl_101001.bin', 'cwdl_101002.bin',
    'cwdl_101003.bin', 'cwdl_101011.bin', 'cwdl_101012.bin', 'cwdl_101021.bin',
    'cwdl_101022.bin', 'cwdl_101031.bin', 'cwdl_101100.bin', 'cwdl_101101.bin',
    'cwdl_101110.bin', 'cwdl_101111.bin', 'cwdl_101120.bin', 'cwdl_101200.bin',
    'cwdl_102001.bin', 'cwdl_102002.bin', 'cwdl_102011.bin', 'cwdl_102100.bin',
    'cwdl_110000.bin', 'cwdl_110001.bin', 'cwdl_110002.bin', 'cwdl_110003.bin',
    'cwdl_110010.bin', 'cwdl_110011.bin', 'cwdl_110020.bin', 'cwdl_110030.bin',
    'cwdl_110100.bin', 'cwdl_110101.bin', 'cwdl_110110.bin', 'cwdl_111000.bin',
    'cwdl_111001.bin', 'cwdl_111010.bin', 'cwdl_120000.bin', 'cwdl_200001.bin',
    'cwdl_200002.bin', 'cwdl_200011.bin', 'cwdl_200012.bin', 'cwdl_200021.bin',
    'cwdl_200100.bin', 'cwdl_200101.bin', 'cwdl_200110.bin', 'cwdl_201001.bin',
    'cwdl_210000.bin',
];

/**
 * TablebaseLoader class - manages tablebase storage and retrieval
 */
export class TablebaseLoader {
    constructor() {
        this.opfsRoot = null;
        this.tbDirectory = null;
        this.loadedFiles = new Set();
        this.onProgress = null;
        this.isInitialized = false;
    }

    /**
     * Initialize OPFS access
     */
    async init() {
        if (!('storage' in navigator) || !('getDirectory' in navigator.storage)) {
            throw new Error('OPFS not supported in this browser');
        }

        this.opfsRoot = await navigator.storage.getDirectory();
        this.tbDirectory = await this.opfsRoot.getDirectoryHandle('tablebases', { create: true });
        this.isInitialized = true;
    }

    /**
     * Check if OPFS is available and initialized
     */
    isAvailable() {
        return this.isInitialized && this.tbDirectory !== null;
    }

    /**
     * Check which tablebases are already stored in OPFS
     */
    async checkStoredTablebases() {
        if (!this.isAvailable()) {
            return [];
        }
        const stored = [];
        for await (const entry of this.tbDirectory.values()) {
            if (entry.kind === 'file' && entry.name.startsWith('dtm_')) {
                stored.push(entry.name);
            }
        }
        return stored;
    }

    /**
     * Download missing tablebases from server
     * @param {Function} onProgress - Callback(loaded, total, currentFile)
     */
    async downloadTablebases(onProgress = null) {
        if (!this.isAvailable()) {
            throw new Error('OPFS not available. Tablebase storage requires a browser with Origin Private File System support.');
        }

        this.onProgress = onProgress;

        // Check what's already stored
        const stored = await this.checkStoredTablebases();
        const storedSet = new Set(stored);

        // Filter to only missing files
        const missing = DTM_FILES.filter(f => !storedSet.has(f));

        if (missing.length === 0) {
            if (onProgress) onProgress(DTM_FILES.length, DTM_FILES.length, 'Complete');
            return { downloaded: 0, total: DTM_FILES.length };
        }

        let downloaded = stored.length;
        const total = DTM_FILES.length;

        for (const filename of missing) {
            try {
                if (onProgress) onProgress(downloaded + 1, total, filename);

                const response = await fetch(TABLEBASE_BASE_URL + filename);
                if (!response.ok) {
                    console.warn(`Failed to download ${filename}: ${response.status}`);
                    continue;
                }

                const data = await response.arrayBuffer();

                // Store in OPFS
                const fileHandle = await this.tbDirectory.getFileHandle(filename, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(data);
                await writable.close();

                downloaded++;
            } catch (err) {
                console.warn(`Error downloading ${filename}:`, err);
            }
        }

        if (onProgress) onProgress(downloaded, total, 'Complete');
        return { downloaded: downloaded - stored.length, total };
    }

    /**
     * Load a tablebase file from OPFS (sync access for Worker)
     * Returns Uint8Array or null if not found
     */
    async loadTablebase(filename) {
        if (!this.isAvailable()) {
            return null;
        }
        try {
            const fileHandle = await this.tbDirectory.getFileHandle(filename);
            const file = await fileHandle.getFile();
            const buffer = await file.arrayBuffer();
            return new Uint8Array(buffer);
        } catch (err) {
            return null;
        }
    }

    /**
     * Load all tablebases and return them as a map
     * @returns {Map<string, Uint8Array>}
     */
    async loadAllTablebases() {
        const tablebases = new Map();

        if (!this.isAvailable()) {
            return tablebases;
        }

        for await (const entry of this.tbDirectory.values()) {
            if (entry.kind === 'file' && entry.name.startsWith('dtm_')) {
                const data = await this.loadTablebase(entry.name);
                if (data) {
                    // Extract material key from filename (dtm_XXXXXX.bin -> XXXXXX)
                    const materialKey = entry.name.slice(4, 10);
                    tablebases.set(materialKey, data);
                }
            }
        }

        return tablebases;
    }

    /**
     * Get total size of stored tablebases
     */
    async getStoredSize() {
        if (!this.isAvailable()) {
            return 0;
        }
        let total = 0;
        for await (const entry of this.tbDirectory.values()) {
            if (entry.kind === 'file') {
                const file = await (await this.tbDirectory.getFileHandle(entry.name)).getFile();
                total += file.size;
            }
        }
        return total;
    }

    /**
     * Check which CWDL tablebases are already stored in OPFS
     */
    async checkStoredCWDLTablebases() {
        if (!this.isAvailable()) {
            return [];
        }
        const stored = [];
        for await (const entry of this.tbDirectory.values()) {
            if (entry.kind === 'file' && entry.name.startsWith('cwdl_')) {
                stored.push(entry.name);
            }
        }
        return stored;
    }

    /**
     * Download missing CWDL tablebases from server
     * @param {Function} onProgress - Callback(loaded, total, currentFile)
     */
    async downloadCWDLTablebases(onProgress = null) {
        if (!this.isAvailable()) {
            throw new Error('OPFS not available.');
        }

        // Check what's already stored
        const stored = await this.checkStoredCWDLTablebases();
        const storedSet = new Set(stored);

        // Filter to only missing files
        const missing = CWDL_FILES.filter(f => !storedSet.has(f));

        if (missing.length === 0) {
            if (onProgress) onProgress(CWDL_FILES.length, CWDL_FILES.length, 'Complete');
            return { downloaded: 0, total: CWDL_FILES.length };
        }

        let downloaded = stored.length;
        const total = CWDL_FILES.length;

        for (const filename of missing) {
            try {
                if (onProgress) onProgress(downloaded + 1, total, filename);

                const response = await fetch(TABLEBASE_BASE_URL + filename);
                if (!response.ok) {
                    console.warn(`Failed to download ${filename}: ${response.status}`);
                    continue;
                }

                const data = await response.arrayBuffer();

                // Store in OPFS
                const fileHandle = await this.tbDirectory.getFileHandle(filename, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(data);
                await writable.close();

                downloaded++;
            } catch (err) {
                console.warn(`Error downloading ${filename}:`, err);
            }
        }

        if (onProgress) onProgress(downloaded, total, 'Complete');
        return { downloaded: downloaded - stored.length, total };
    }

    /**
     * Clear all stored tablebases
     */
    async clearTablebases() {
        if (!this.isAvailable()) {
            return;
        }
        for await (const entry of this.tbDirectory.values()) {
            if (entry.kind === 'file') {
                await this.tbDirectory.removeEntry(entry.name);
            }
        }
    }
}

/**
 * Load NN model file from server
 */
export async function loadNNModelFile(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load model: ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
}

export { DTM_FILES, CWDL_FILES };
