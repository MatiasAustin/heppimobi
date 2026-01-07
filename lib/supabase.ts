
import { createClient } from '@supabase/supabase-js';
import { LandingPageContent } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Local storage will be used as fallback.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export const fetchRemoteContent = async (): Promise<LandingPageContent | null> => {
    try {
        const { data, error } = await supabase
            .from('site_content')
            .select('content')
            .order('updated_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            console.error('Error fetching remote content:', error);
            return null;
        }
        return data?.content as LandingPageContent;
    } catch (err) {
        console.error('Remote fetch failed:', err);
        return null;
    }
};

export const saveRemoteContent = async (content: LandingPageContent) => {
    try {
        // Get the first record's ID to update, or just insert if empty
        const { data: existing } = await supabase
            .from('site_content')
            .select('id')
            .limit(1)
            .single();

        if (existing?.id) {
            await supabase
                .from('site_content')
                .update({ content, updated_at: new Date().toISOString() })
                .eq('id', existing.id);
        } else {
            await supabase
                .from('site_content')
                .insert([{ content, updated_at: new Date().toISOString() }]);
        }
    } catch (err) {
        console.error('Remote save failed:', err);
    }
};
