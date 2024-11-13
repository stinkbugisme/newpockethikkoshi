export interface Dimension {
  length: string;
  width: string;
  height: string;
}

export interface Subcategory {
  name: string;
  dimensions: Dimension;
  features: string[];
  image_path: string;
}

export interface Category {
  name: string;
  has_subcategories: boolean;
  image_path: string;
  subcategories?: Subcategory[];
  dimensions?: Dimension; // オプショナルに変更
  features?: string[]; // オプショナルに追加
}
export interface BaggageSelection {
  category: Category;
  subcategory?: Subcategory;
  quantity: number;
}
export interface SelectedItem {
  name: string; // 選択された荷物の名前
  quantity: number; // 数量
  dimensions: Dimension; // サイズ情報
}
